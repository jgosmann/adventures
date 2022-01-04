/// <reference types="grecaptcha" />
import React, { Component, createRef } from "react"

let recaptchaLoaded = false
const recaptchaInstances: ReCaptcha[] = []

declare global {
  interface Window {
    onRecaptchaLoad: () => void
  }
}

export type ReCaptchaProps = {
  sitekey: string
  size: "invisible"
  onChange?: (captcha: string) => void
  onExpired?: () => void
  onError?: () => void
}

type ReCaptchaState = {
  widgetId?: number
}

class ReCaptcha extends Component<ReCaptchaProps, ReCaptchaState> {
  readonly state: Readonly<ReCaptchaState> = {
    widgetId: undefined,
  }
  readonly containerRef = createRef<HTMLDivElement>()

  constructor(props: ReCaptchaProps) {
    super(props)
    recaptchaInstances.push(this)
  }

  componentDidMount() {
    if (recaptchaLoaded) {
      this.onRecaptchaLoad()
    } else if (!ReCaptcha.isRecaptchaScriptInjected()) {
      ReCaptcha.injectRecaptchaScript()
    }
  }

  onRecaptchaLoad() {
    const { sitekey, size, onChange, onExpired, onError } = this.props
    if (!this.state.widgetId && this.containerRef.current) {
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

  static isRecaptchaScriptInjected() {
    const arrayBase: HTMLScriptElement[] = []
    const scripts = Object.assign(arrayBase, document.scripts)
    return scripts.some(
      s =>
        s.src.match(/(https?:)\/\/(www\.)?google\.com\/recaptcha\/.*/i) !== null
    )
  }

  static injectRecaptchaScript() {
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

export default ReCaptcha
