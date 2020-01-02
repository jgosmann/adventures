import { h, render, Component, createRef } from "preact";

const recaptchaInstances = [];

class ReCaptcha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptInjected: false,
      containerCaptured: false,
      recaptchaRendered: false,
      widgetId: null
    };
    this.containerRef = createRef();
    recaptchaInstances.push(this);
  }

  componentDidMount() {
    if (this.isRecaptchaScriptInjected()) {
      this.setState({ scriptInjected: true });
    } else {
      this.injectRecaptchaScript();
    }
  }

  execute() {
    grecaptcha.execute(this.state.widgetId);
  }

  render(props, state) {
    if (
      state.scriptInjected &&
      state.containerCaptured &&
      state.widgetId === null
    ) {
      this.setState({
        widgetId: grecaptcha.render(this.containerRef.current, {
          sitekey: props.sitekey,
          size: props.size,
          callback: props.onChange,
          "expired-callback": props.onExpired,
          "error-callback": props.onError
        })
      });
    }

    if (!state.containerCaptured) {
      this.setState({ containerCaptured: true });
    }

    return <div ref={this.containerRef} />;
  }

  isRecaptchaScriptInjected() {
    const scripts = Object.assign([], document.scripts);
    return scripts.some(
      s =>
        s.src.match(/(https?:)\/\/(www\.)?google\.com\/recaptcha\/.*/i) !== null
    );
  }

  injectRecaptchaScript() {
    window.recaptchaLoaded = () =>
      recaptchaInstances.forEach(x => x.setState({ scriptInjected: true }));
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=explicit&onload=recaptchaLoaded";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}

export default ReCaptcha;
