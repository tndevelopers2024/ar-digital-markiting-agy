import { test, expect } from "@playwright/test";

test.describe("Page Health & Core Accessibility", () => {
  test("home page loads with 200 OK and critical elements", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    // Verify title and page structure
    await expect(page).toHaveTitle(/AR Digital Marketing|AR Marketing/i);
    const main = page.locator("main");
    await expect(main).toBeVisible();
  });
});
