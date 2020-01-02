import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { h, render } from "preact";
import { useEffect, useState } from "preact/hooks";

function ButtonLink({ children, onClick, title }) {
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (isAnimating) {
      window.setTimeout(() => setIsAnimating(false), 200);
    }
  }, [isAnimating]);

  const onClickInternal = e => {
    setIsAnimating(true);
    onClick(e);
  };

  return (
    <a className="button-small" onClick={onClickInternal} title={title}>
      {children}
      {isAnimating ? <div className="enlarge-fade-out">{children}</div> : null}
    </a>
  );
}

function CopyButton({ getCopyText }) {
  const onClick = () => {
    navigator.clipboard.writeText(getCopyText());
  };
  const title = document.documentElement.lang === "de" ? "Kopieren" : "Copy";
  return (
    <ButtonLink onClick={onClick} title={title}>
      <FontAwesomeIcon icon={faCopy} />
    </ButtonLink>
  );
}

function enhanceCryptedElements(className, getData, onClick) {
  for (let cryptedElem of document.getElementsByClassName(className)) {
    if (onClick) {
      cryptedElem.addEventListener("click", e => {
        e.preventDefault();
        onClick(getData(cryptedElem));
      });
    }
    const copyBtn = document.createElement("span");
    cryptedElem.parentElement.insertBefore(copyBtn, cryptedElem.nextSibling);
    render(<CopyButton getCopyText={() => getData(cryptedElem)} />, copyBtn);
  }
}

const enableCrypted = () => {
  const getPhone = cryptedElem => {
    return (
      cryptedElem.getAttribute("data-country") +
      cryptedElem.getAttribute("data-area") +
      cryptedElem.getAttribute("data-block0") +
      cryptedElem.getAttribute("data-block1")
    );
  };

  const getEmail = cryptedElem => {
    return (
      cryptedElem.getAttribute("data-name") +
      "@" +
      cryptedElem.getAttribute("data-domain") +
      "." +
      cryptedElem.getAttribute("data-tld")
    );
  };

  enhanceCryptedElements("crypted-phone", getPhone);
  enhanceCryptedElements("crypted-email", getEmail, email => {
    window.location.href = "mailto:" + email;
  });
};

if (document.readyState === "loading") {
  window.addEventListener("load", enableCrypted);
} else {
  enableCrypted();
}
