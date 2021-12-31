import React, { useRef } from "react"

import CopyButton from "./CopyButton"

export interface CryptedEmailProps {
  name: string
  domain: string
  tld: string
  writeEmailTitle?: string
  copyTitle?: string
}

const CryptedEmail = ({
  name,
  domain,
  tld,
  writeEmailTitle,
  copyTitle,
}: CryptedEmailProps) => {
  const elem = useRef<HTMLAnchorElement>(null)

  const getEmail = () => {
    if (elem?.current) {
      return (
        elem.current.getAttribute("data-name") +
        "@" +
        elem.current.getAttribute("data-domain") +
        "." +
        elem.current.getAttribute("data-tld")
      )
    }
    return ""
  }

  const onClick = (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    ev.preventDefault()
    window.location.href = `mailto:${getEmail()}`
  }

  return (
    <>
      <a
        ref={elem}
        onClick={onClick}
        href="#"
        data-name={name}
        data-domain={domain}
        data-tld={tld}
        className="crypted-email"
        title={writeEmailTitle}
        css={{
          marginRight: 4,
          ["&:after"]: {
            content: 'attr(data-name) "@" attr(data-domain) "." attr(data-tld)',
          },
        }}
      ></a>
      <CopyButton getCopyText={getEmail} title={copyTitle} />
    </>
  )
}

export default CryptedEmail
