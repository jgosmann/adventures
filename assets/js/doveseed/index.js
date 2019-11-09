import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

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

  const onSubmit = (e) => {
    e.preventDefault();
    setState('requestOngoing');

    fetch(props.url + emailInput.current.value, {method: 'POST'}).then((response) => {
      setState(response.ok ? 'success' : 'error');
    }).catch(() => {
      setState('error');
    });
  };

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
    </form>
  );
}

function LoadDoveseedSubscriptionForm(selector, props) {
  const domContainer = document.querySelector(selector);
  ReactDOM.render(React.createElement(SubscribeForm, props), domContainer);
}

export { LoadDoveseedSubscriptionForm }
