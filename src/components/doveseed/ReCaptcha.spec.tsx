import { act, render } from "@testing-library/react"
import React from "react"
import ReCaptcha from "./ReCaptcha"

describe("ReCaptcha", () => {
  const onChange = () => undefined
  const onExpired = () => undefined
  const onError = () => undefined

  const ref = React.createRef<ReCaptcha>()

  const recaptcha = (
    <ReCaptcha
      sitekey="some-site-key"
      size="invisible"
      onChange={onChange}
      onExpired={onExpired}
      onError={onError}
      ref={ref}
    />
  )

  describe("intially", () => {
    it("does not inject the ReCaptcha script", () => {
      expect(ReCaptcha.isRecaptchaScriptInjected()).toBeFalsy()
    })
  })

  describe("after mount", () => {
    const widgetId = 123

    beforeEach(() => {
      const grecaptchaMock = {
        render: jest.fn(() => widgetId),
        reset: jest.fn(),
        getResponse: jest.fn(),
        execute: jest.fn(),
        ready: jest.fn(),
      }
      global.grecaptcha = {
        ...grecaptchaMock,
        enterprise: grecaptchaMock,
      }
      render(recaptcha)
    })

    it("injected the ReCaptcha script", () => {
      expect(ReCaptcha.isRecaptchaScriptInjected()).toBeTruthy()
    })

    it("did not render yet", () => {
      expect(global.grecaptcha.render).not.toHaveBeenCalled()
    })

    describe("when the ReCaptcha script was loaded", () => {
      beforeEach(() => {
        act(() => window.onRecaptchaLoad())
      })

      it("calls the grecaptcha render function", () => {
        expect(global.grecaptcha.render).toHaveBeenLastCalledWith(
          expect.anything(),
          {
            sitekey: "some-site-key",
            size: "invisible",
            callback: onChange,
            "expired-callback": onExpired,
            "error-callback": onError,
          }
        )
      })

      describe("when calling execute", () => {
        it("forwards the call to grecaptcha with the widget ID", () => {
          ref.current?.execute()
          expect(grecaptcha.execute).toHaveBeenLastCalledWith(widgetId)
        })
      })
    })
  })
})
