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

  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get('email');

  const onSubmit = (e) => {
    e.preventDefault();
    setState('requestOngoing');

    recaptcha.current.execute();
  };

  const onCaptchaComplete = (captcha) => {
    return fetch(props.url.replace(/\/$/, '') + '/' + emailInput.current.value, {
      method: 'POST',
      body: JSON.stringify({captcha}),
      headers: {
        'Content-Type': 'application/json'
      }})
    .then((response) => {
      setState(response.ok ? 'success' : 'error');
    }).catch(() => {
      setState('error');
    });
  };

  const onError = () => {
    setState('error')
  }

  const disabled = state === 'requestOngoing' || state === 'success';

  return (
    <form onSubmit={onSubmit} className={'state-' + state}>
      <input ref={emailInput} defaultValue={email} type="email" placeholder="Email address" required={true} disabled={disabled} />
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

function ConfirmationButton(props) {
  const [state, setState] = useState('initial');
  const emailInput = useRef(null);
  const token = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setState('requestOngoing');

    return fetch(props.url.replace(/\/$/, '') + '/' + emailInput.current.value, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token.current.value
      }})
    .then((response) => {
      setState(response.ok ? 'success' : 'error');
    }).catch(() => {
      setState('error');
    });
  };

  const disabled = state === 'requestOngoing' || state === 'success';

  const searchParams = new URLSearchParams(window.location.search);

  return (
    <form onSubmit={onSubmit} className={'state-' + state}>
      <input ref={token} type="hidden" required={true} value={searchParams.get('token')} />
      <input ref={emailInput} type="email" required={true} disabled={true} value={searchParams.get('email')} />
      <button type="submit" className="button" disabled={disabled}>
        <VCollapsible collapsed={state === 'initial'}>
          <ProcessingStateIcon state={state} />
        </VCollapsible>
        {props.submitLabel}
      </button>
    </form>
  );
}

function LoadDoveseedSubscriptionForm(selector) {
  const domContainers = document.querySelectorAll(selector);
  for (let domContainer of domContainers) {
    const props = {
      url: domContainer.getAttribute('data-url'),
      submitLabel: domContainer.getAttribute('data-submit-label'),
    };
    render(<SubscribeForm {...props} />, domContainer);
  }
}

function LoadDoveseedConfirmationButton(selector) {
  const domContainers = document.querySelectorAll(selector);
  for (let domContainer of domContainers) {
    const props = {
      url: domContainer.getAttribute('data-url'),
      submitLabel: domContainer.getAttribute('data-submit-label'),
    };
    render(<ConfirmationButton {...props} />, domContainer);
  }
}


function Load() {
  LoadDoveseedSubscriptionForm('.doveseed');
  LoadDoveseedConfirmationButton('.doveseed-confirm');
}


if (document.readyState === 'loading') {
  window.addEventListener('load', Load);
} else {
  Load();
}
