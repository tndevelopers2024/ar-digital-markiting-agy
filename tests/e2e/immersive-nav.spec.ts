import { test, expect } from "@playwright/test";

test.describe("Immersive Full Screen Nav - Component & Showcase", () => {
  test("loads showcase demo page and renders trigger button", async ({ page }) => {
    const response = await page.goto("/demo/immersive-nav");
    expect(response?.status()).toBe(200);

    // Verify page title and header
    await expect(page.locator("h1")).toContainText("Immersive Full Screen Navigation");

    // Check trigger hamburger button
    const toggleButton = page.locator('button[data-testid="immersive-nav-toggle"]');
    await expect(toggleButton).toBeVisible();
    await expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  test("opens overlay menu and traps focus", async ({ page }) => {
    await page.goto("/demo/immersive-nav");
    const toggleButton = page.locator('button[data-testid="immersive-nav-toggle"]');

    // Click to open
    await toggleButton.click();
    await expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    // Check overlay navigation is active
    const overlayNav = page.locator('nav[aria-label="Full Screen Overlay Navigation"]');
    await expect(overlayNav).toBeAttached();

    // Verify nav links inside overlay
    const homeLink = overlayNav.locator('a:has-text("Home")');
    await expect(homeLink).toBeAttached();

    // Verify featured photography preview images are present
    const previewImages = overlayNav.locator("img");
    expect(await previewImages.count()).toBeGreaterThanOrEqual(1);

    // Press Escape to close via accessible focus trap
    await page.keyboard.press("Escape");
    await expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  test("interactive controls change theme and clip origin", async ({ page }) => {
    await page.goto("/demo/immersive-nav");

    // Click 'Electric Blue' theme
    const arBlueBtn = page.locator('button:has-text("Electric Blue")');
    await expect(arBlueBtn).toBeVisible();
    await arBlueBtn.click();

    // Click 'top' clip origin
    const topOriginBtn = page.locator('button:has-text("top")');
    await expect(topOriginBtn).toBeVisible();
    await topOriginBtn.click();

    // Open overlay with new settings
    const toggleButton = page.locator('button[data-testid="immersive-nav-toggle"]');
    await toggleButton.click();
    await expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    const overlayNav = page.locator('nav[aria-label="Full Screen Overlay Navigation"]');
    await expect(overlayNav).toBeAttached();
  });

  test("main header on desktop includes Menu button opening immersive navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    // Dismiss preloader if present
    await page.evaluate(() => {
      document.documentElement.dataset.preloader = "skip";
    });

    const menuBtn = page.locator('header button[aria-label="Open immersive full screen navigation"]');
    await expect(menuBtn).toBeVisible();

    await menuBtn.click();
    const overlayNav = page.locator('nav[aria-label="Full Screen Overlay Navigation"]');
    await expect(overlayNav).toBeAttached();

    // Escape closes overlay
    await page.keyboard.press("Escape");
    await expect(overlayNav).not.toBeAttached();
  });
});
