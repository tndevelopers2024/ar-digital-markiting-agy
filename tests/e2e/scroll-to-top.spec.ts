import { test, expect } from "@playwright/test";

test.describe("Scroll To Top Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("ar-preloader-seen", "1");
    });
  });

  test("floating scroll to top button reveals on scroll and navigates to page top", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Preloader dismiss
    const preloader = page.locator(".ar-preloader");
    if ((await preloader.count()) > 0) {
      await expect(preloader).toHaveCount(0, { timeout: 8000 });
    }

    const floatingBtn = page.locator('button[aria-label="Scroll to top"]');
    await expect(floatingBtn).toBeAttached();

    // Initially at top: button container is aria-hidden="true" and hidden via opacity-0
    const btnContainer = floatingBtn.locator("..");
    await expect(btnContainer).toHaveAttribute("aria-hidden", "true");
    await expect(btnContainer).toHaveClass(/opacity-0/);

    // Scroll down past 600px
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);

    // Floating button should now be visible and interactive
    await expect(btnContainer).toHaveAttribute("aria-hidden", "false");
    await expect(btnContainer).toHaveClass(/opacity-100/);
    await expect(floatingBtn).toBeVisible();

    // Click scroll to top button
    await floatingBtn.click();
    await page.waitForTimeout(1000);

    // Verify window scroll position returned to near top (<= 50px)
    const currentScrollY = await page.evaluate(() => window.scrollY || document.documentElement.scrollTop);
    expect(currentScrollY).toBeLessThanOrEqual(50);
  });

  test("footer back-to-top button scrolls smoothly back to the top", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Preloader dismiss
    const preloader = page.locator(".ar-preloader");
    if ((await preloader.count()) > 0) {
      await expect(preloader).toHaveCount(0, { timeout: 8000 });
    }

    const footerBtn = page.getByRole("button", { name: "Scroll back to top of page" });
    await footerBtn.scrollIntoViewIfNeeded();
    await expect(footerBtn).toBeVisible();

    const scrollBefore = await page.evaluate(() => window.scrollY || document.documentElement.scrollTop);
    expect(scrollBefore).toBeGreaterThan(1000);

    // Click footer scroll to top button
    await footerBtn.click();
    await page.waitForTimeout(1200);

    const scrollAfter = await page.evaluate(() => window.scrollY || document.documentElement.scrollTop);
    expect(scrollAfter).toBeLessThanOrEqual(50);
  });

  test("floating scroll to top operates seamlessly on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const preloader = page.locator(".ar-preloader");
    if ((await preloader.count()) > 0) {
      await expect(preloader).toHaveCount(0, { timeout: 8000 });
    }

    const floatingBtn = page.locator('button[aria-label="Scroll to top"]');
    const btnContainer = floatingBtn.locator("..");

    // Scroll down on mobile
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(500);

    await expect(btnContainer).toHaveAttribute("aria-hidden", "false");
    await expect(btnContainer).toHaveClass(/opacity-100/);
    await expect(floatingBtn).toBeVisible();

    // Click floating button
    await floatingBtn.click();
    await page.waitForTimeout(1000);

    const currentScrollY = await page.evaluate(() => window.scrollY || document.documentElement.scrollTop);
    expect(currentScrollY).toBeLessThanOrEqual(50);
  });
});
