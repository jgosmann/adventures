import { test, expect } from "@playwright/test"
import getEmail from "./getEmail"

test("the subscription process", async ({ page }) => {
  const email = "foobar@example.com"

  await page.route(/google\.com/, route => route.abort())

  await page.addInitScript(() => {
    const originalFetch = window.fetch
    window.fetch = (url, options) =>
      originalFetch(
        url
          .toString()
          .replace(
            "https://doveseed.adventures.jgosmann.de",
            "http://127.0.0.1:5000"
          ),
        options
      )

    type CaptchaCallback = (captcha: string) => void
    let captchaSuccessCallback: CaptchaCallback
    ;(window as unknown as Record<string, object>).grecaptcha = {
      execute: () => captchaSuccessCallback("dummyCaptcha"),
      render: (elem: unknown, parameters: { callback: CaptchaCallback }) => {
        if (parameters) {
          captchaSuccessCallback = parameters.callback
        }
        return 42
      },
      getResponse: () => "dummy-response",
      ready: () => {},
      reset: () => {},
    }
  })

  await page.goto("/subscribe")
  await page.evaluate(() =>
    (window as unknown as { onRecaptchaLoad: () => void }).onRecaptchaLoad()
  )

  await page.getByPlaceholder("Email address").fill(email)
  await page.getByRole("button", { name: "Subscribe" }).click()
  await expect(
    page.getByRole("button").locator('[data-icon="check"]')
  ).toBeVisible()

  const getConfirmationLink = async (): Promise<string> => {
    const content = await getEmail(email)
    const m = content
      .replaceAll(/=\r?\n/g, "")
      .replaceAll(/=3[dD]/g, "=")
      .match(/<link>(?<link>.*)<\/link>/)
    if (!m?.groups?.link) {
      throw new Error("missing confirmation link in email")
    }
    return m.groups.link
  }

  await page.goto(await getConfirmationLink())
  await expect(page.getByRole("textbox")).toHaveValue(email)
  await page.getByRole("button", { name: "Confirm" }).click()
  await expect(
    page.getByRole("button").locator('[data-icon="check"]')
  ).toBeVisible()

  await page.goto("/unsubscribe")
  await page.evaluate(() =>
    (window as unknown as { onRecaptchaLoad: () => void }).onRecaptchaLoad()
  )

  await page.getByPlaceholder("Email address").fill(email)
  await page.getByRole("button", { name: "Unsubscribe" }).click()
  await expect(
    page.getByRole("button").locator('[data-icon="check"]')
  ).toBeVisible()

  await page.goto(await getConfirmationLink())
  await expect(page.getByRole("textbox")).toHaveValue(email)
  await page.getByRole("button", { name: "Confirm" }).click()
  await expect(
    page.getByRole("button").locator('[data-icon="check"]')
  ).toBeVisible()
})
