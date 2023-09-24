import { test, expect } from "@playwright/test"

test("search function", async ({ page }) => {
  await page.addInitScript(() => {
    const originalFetch = window.fetch
    window.fetch = (url, options) =>
      originalFetch(
        url
          .toString()
          .replace(
            "https://search.adventures.jgosmann.de",
            "http://127.0.0.1:4000"
          ),
        options
      )
  })

  await page.goto("/")
  await page.getByPlaceholder("Search").first().fill("Zugspitz")
  await page.getByTitle("Submit search").first().click()

  await expect(page.getByText("Zugspitz crossing")).toBeVisible()
})
