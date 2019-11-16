import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { h, render, Component, createRef } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import ReCaptcha from './recaptcha';

function VCollapsible(props) {
  var className = 'vcollapsible';
  if (props.collapsed) {
    className += ' vcollapsed';
  }
  return (
    <span className={className}>
      {props.children}
    </span>
  );
}

function ProcessingStateIcon(props) {
  switch (props.state) {
    case 'requestOngoing':
      return <FontAwesomeIcon icon={faCircleNotch} className="spinner" />
    case 'success':
      return <FontAwesomeIcon icon={faCheck} />
    case 'error':
      return <FontAwesomeIcon icon={faTimes} />
    default:
      return null;
  }
}

function SubscribeForm(props) {
  const [state, setState] = useState('initial');
  const emailInput = useRef(null);
  const recaptcha = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setState('requestOngoing');

    recaptcha.current.execute();
  };

  const onCaptchaComplete = (captcha) => {
    return fetch(props.url + emailInput.current.value, {
      method: 'POST',
      body: JSON.stringify({captcha})})
    .then((response) => {
      console.log('uiae');
      setState(response.ok ? 'success' : 'error');
      console.log('uiae2');
    }).catch(() => {
      console.log('c');
      setState('error');
    });
  };

  const onError = () => {
    setState('error')
  }

  const disabled = state === 'requestOngoing' || state === 'success';

  return (
    <form onSubmit={onSubmit} className={'state-' + state}>
      <input ref={emailInput} type="email" placeholder="Email address" required={true} disabled={disabled} />
      <button type="submit" disabled={disabled}>
        <VCollapsible collapsed={state === 'initial'}>
          <ProcessingStateIcon state={state} />
        </VCollapsible>
        {props.submitLabel}
      </button>
      <ReCaptcha
        ref={recaptcha}
        size="invisible"
        sitekey="6LdL4sEUAAAAAEsmXbX_Z21wla_bM9dhjSe8I5hf"
        onChange={onCaptchaComplete}
        onError={onError}
        onExpired={onError} />
    </form>
  );
}

function LoadDoveseedSubscriptionForm(selector, props) {
  const domContainer = document.querySelector(selector);
  render(<SubscribeForm {...props} />, domContainer);
}

export { LoadDoveseedSubscriptionForm }
