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

  test("serves authentic AR brand favicon and icon resources with 200 OK", async ({ page, request }) => {
    await page.goto("/");

    // Verify favicon link tags in DOM
    const iconLinks = await page.locator('link[rel="icon"]').all();
    expect(iconLinks.length).toBeGreaterThan(0);

    for (const link of iconLinks) {
      const href = await link.getAttribute("href");
      expect(href).not.toContain("whatsapp");
    }

    // Verify apple touch icon does not contain whatsapp
    const appleIcon = page.locator('link[rel="apple-touch-icon"]');
    if ((await appleIcon.count()) > 0) {
      const appleHref = await appleIcon.getAttribute("href");
      expect(appleHref).not.toContain("whatsapp");
    }

    // Direct HTTP status verification for favicon & icon assets
    const [favRes, iconRes, appleRes] = await Promise.all([
      request.get("/favicon.ico"),
      request.get("/icon.svg"),
      request.get("/apple-icon.png"),
    ]);

    expect(favRes.status()).toBe(200);
    expect(iconRes.status()).toBe(200);
    expect(appleRes.status()).toBe(200);
  });
});

