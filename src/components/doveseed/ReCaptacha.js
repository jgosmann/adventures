import PropTypes from "prop-types"
import React, { Component, createRef } from "react"

let recaptchaLoaded = false
const recaptchaInstances = []

class ReCaptcha extends Component {
  constructor(props) {
    super(props)
    this.state = {
      widgetId: null,
    }
    this.containerRef = createRef()
    recaptchaInstances.push(this)
  }

  componentDidMount() {
    if (recaptchaLoaded) {
      this.onRecaptchaLoad()
    } else if (!this.isRecaptchaScriptInjected()) {
      this.injectRecaptchaScript()
    }
  }

  onRecaptchaLoad() {
    const { sitekey, size, onChange, onExpired, onError } = this.props
    if (!this.state.widgetId) {
      this.setState({
        widgetId: grecaptcha.render(this.containerRef.current, {
          sitekey,
          size,
          callback: onChange,
          "expired-callback": onExpired,
          "error-callback": onError,
        }),
      })
    }
  }

  execute() {
    grecaptcha.execute(this.state.widgetId)
  }

  render() {
    return <div ref={this.containerRef} />
  }

  isRecaptchaScriptInjected() {
    const scripts = Object.assign([], document.scripts)
    return scripts.some(
      s =>
        s.src.match(/(https?:)\/\/(www\.)?google\.com\/recaptcha\/.*/i) !== null
    )
  }

  injectRecaptchaScript() {
    window.onRecaptchaLoad = () => {
      recaptchaLoaded = true
      recaptchaInstances.forEach(inst => inst.onRecaptchaLoad())
    }

    const script = document.createElement("script")
    script.src =
      "https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoad"
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }
}

ReCaptcha.propTypes = {
  sitekey: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["invisible"]),
  onChange: PropTypes.func,
  onExpired: PropTypes.func,
  onError: PropTypes.func,
}

export default ReCaptcha
