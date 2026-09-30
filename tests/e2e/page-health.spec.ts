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

  test("loads in light theme by default and allows toggling to dark", async ({ page }) => {
    await page.goto("/");

    // Verify html does not have dark class by default
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);

    // Locate desktop theme toggle button
    const themeToggle = page.locator('header button[aria-label="Switch to dark theme"]');
    await expect(themeToggle).toBeVisible();

    // Toggle to dark theme
    await themeToggle.click();
    await expect(html).toHaveClass(/dark/);

    // Toggle back to light theme
    const themeToggleLight = page.locator('header button[aria-label="Switch to light theme"]');
    await expect(themeToggleLight).toBeVisible();
    await themeToggleLight.click();
    await expect(html).not.toHaveClass(/dark/);
  });
});

