import { test, expect } from "@playwright/test";

test.describe("About Section - Techie Nutpam Style Bento Architecture", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("ar-preloader-seen", "1");
    });
  });

  test("renders about section header, metrics, and bento cards on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeVisible();

    // 1. Eyebrow tag
    const eyebrow = aboutSection.getByText("ABOUT US", { exact: true });
    await expect(eyebrow).toBeVisible();

    // 2. Headline
    const headline = aboutSection.locator("h2");
    await expect(headline).toContainText("Why Businesses Across Industries");
    await expect(headline).toContainText("Choose");
    await expect(headline).toContainText("AR Marketing.");

    // 3. 2x2 Metrics Box
    await expect(aboutSection.locator("text=8+")).toBeVisible();
    await expect(aboutSection.locator("text=YEARS IN BUSINESS")).toBeVisible();
    await expect(aboutSection.locator("text=500+")).toBeVisible();
    await expect(aboutSection.locator("text=CAMPAIGNS DELIVERED")).toBeVisible();
    await expect(aboutSection.locator("text=150+")).toBeVisible();
    await expect(aboutSection.locator("text=ACTIVE CLIENTS")).toBeVisible();
    await expect(aboutSection.locator("text=100%")).toBeVisible();
    await expect(aboutSection.locator("text=ROI & PERFORMANCE FOCUS")).toBeVisible();

    // 4. Feature Card 01
    await expect(aboutSection.locator("text=01")).toBeVisible();
    await expect(
      aboutSection.locator("text=We speak your language, not just marketing jargon")
    ).toBeVisible();

    // 5. Bottom Row Cards (02 - 05)
    await expect(aboutSection.getByText("02", { exact: true })).toBeVisible();
    await expect(aboutSection.locator("text=One team for everything")).toBeVisible();

    await expect(aboutSection.getByText("03", { exact: true })).toBeVisible();
    await expect(aboutSection.locator("text=We've worked across industries")).toBeVisible();

    await expect(aboutSection.getByText("04", { exact: true })).toBeVisible();
    await expect(aboutSection.locator("text=Global client base")).toBeVisible();

    await expect(aboutSection.getByText("05", { exact: true })).toBeVisible();
    await expect(aboutSection.locator("text=Support doesn't stop at launch")).toBeVisible();

    // 6. Action Links
    const learnMoreLink = aboutSection.locator('a[href="/about"]').first();
    await expect(learnMoreLink).toBeVisible();

    const teamLink = aboutSection.locator('a[href="#inquiry"]').first();
    await expect(teamLink).toBeVisible();
  });

  test("renders cleanly on mobile viewport without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeVisible();

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
