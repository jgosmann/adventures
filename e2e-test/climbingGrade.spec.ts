import { test, expect } from "@playwright/test"

test("selection of climbing grade conversion", async ({ page }) => {
  await page.goto("/posts/190716-squamish/")
  const firstGradeSelector = page.locator(".climbingGrade").first()

  await expect(firstGradeSelector).toContainText("YDS")

  await firstGradeSelector.click()
  await expect(firstGradeSelector.locator("form")).toHaveCSS("opacity", "1")

  await firstGradeSelector.getByRole("radio").nth(0).click()
  await expect(firstGradeSelector).toContainText("YDS")

  await firstGradeSelector.getByRole("radio").nth(1).click()
  await expect(firstGradeSelector).toContainText("UIAA")

  await page.locator("body").click()
  await expect(firstGradeSelector.locator("form")).toHaveCSS("opacity", "0")
})
