import { test, expect } from "@playwright/test";
import { siteConfig } from "@/config/site";

test.describe("Services Section - Minimalist Light-Theme Studio Visuals", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("all 6 service cards render bespoke light studio images with 200 OK", async ({ page, request }) => {
    const servicesSection = page.locator("#services");
    await expect(servicesSection).toBeVisible();

    const serviceImages = servicesSection.locator("ul.grid > li img");
    await expect(serviceImages).toHaveCount(6);

    for (let i = 0; i < siteConfig.services.length; i++) {
      const service = siteConfig.services[i];
      const card = servicesSection.locator("ul.grid > li").filter({ hasText: service.title });
      await expect(card).toBeVisible();

      if (service.image) {
        const img = card.locator("img");
        await expect(img).toBeVisible();
        // Next.js Image component wraps the src in /_next/image?url=...
        const srcAttr = await img.getAttribute("src");
        expect(srcAttr).toBeTruthy();
        expect(srcAttr).toContain(encodeURIComponent(service.image));

        // Verify the static image asset is served with 200 OK
        const response = await request.get(service.image);
        expect(response.status()).toBe(200);
      }
    }
  });

  test("service card hover state maintains smooth visual scale transition", async ({ page }) => {
    const servicesSection = page.locator("#services");
    const firstCard = servicesSection.locator("ul.grid > li").first();
    await firstCard.scrollIntoViewIfNeeded();

    const imgWrapper = firstCard.locator(".aspect-\\[16\\/9\\]");
    await expect(imgWrapper).toBeVisible();

    const img = imgWrapper.locator("img");
    await expect(img).toHaveClass(/transition-transform/);
    await expect(img).toHaveClass(/group-hover:scale-105/);
  });

  test("services section renders cleanly on mobile viewport without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/#services");
    await page.waitForLoadState("domcontentloaded");

    const servicesSection = page.locator("#services");
    await expect(servicesSection).toBeVisible();

    // Verify all 6 cards are rendered and visible in the grid
    const cards = servicesSection.locator("ul.grid > li");
    await expect(cards).toHaveCount(6);

    // Verify no horizontal document overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
