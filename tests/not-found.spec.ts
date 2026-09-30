import { test, expect } from "@playwright/test";

test.describe("404 Not Found Page", () => {
  test.slow();
  test("requesting a nonexistent URL renders bespoke 404 page with 404 status", async ({
    page,
  }) => {
    const response = await page.goto("/non-existent-route-404-test");

    // In Next.js production build, not-found routes return 404 HTTP status
    expect(response?.status()).toBe(404);

    // Verify document title or 404 status indicator
    await expect(page).toHaveTitle(/404|Page Not Found|AR Digital Marketing/i);

    // Verify prominent 404 badge & number
    const statusNumber = page.locator('[data-testid="status-404-number"]');
    await expect(statusNumber).toBeVisible();
    await expect(statusNumber).toHaveText("404");

    // Verify headline and subcopy
    const headline = page.locator("h1");
    await expect(headline).toBeVisible();
    await expect(headline).toContainText(/does not exist/i);

    // Verify eyebrow pill
    await expect(
      page.getByText(/Signal Lost in Digital Space/i)
    ).toBeVisible();
  });

  test("contains all primary CTAs and navigates back to homepage", async ({
    page,
  }) => {
    await page.goto("/non-existent-route-404-test");

    // Verify primary CTA: Return to Homepage
    const returnHomeBtn = page.getByRole("link", {
      name: /Return to Homepage/i,
    });
    await expect(returnHomeBtn).toBeVisible();
    await expect(returnHomeBtn).toHaveAttribute("href", "/");

    // Verify secondary CTA: Explore Capabilities
    const exploreBtn = page.getByRole("link", {
      name: /Explore Capabilities/i,
    });
    await expect(exploreBtn).toBeVisible();
    await expect(exploreBtn).toHaveAttribute("href", "/#services");

    // Verify tertiary CTA: Book Consultation
    const consultBtn = page.getByRole("link", {
      name: /Book Consultation/i,
    });
    await expect(consultBtn).toBeVisible();
    await expect(consultBtn).toHaveAttribute("href", "/contact");

    // Click Return to Homepage and verify navigation
    await returnHomeBtn.click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("renders navigational waypoints directory", async ({ page }) => {
    await page.goto("/non-existent-route-404-test");

    // Verify Waypoints section
    const waypointsNav = page.locator('nav[aria-label="Waypoints Grid"]');
    await expect(waypointsNav).toBeVisible();

    // Verify Waypoint cards
    await expect(page.getByText("Capabilities & Services")).toBeVisible();
    await expect(page.getByText("Methodology & Process")).toBeVisible();
    await expect(page.getByText("Client Roster & Proof")).toBeVisible();
    await expect(page.getByText("Common Questions")).toBeVisible();

    // Verify assistance strip
    await expect(page.getByText("Can't find what you need?")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Email Direct/i })
    ).toBeVisible();
  });

  test("renders cleanly on mobile viewport without layout overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/non-existent-route-404-test");

    // Check main element and headline on mobile
    const headline = page.locator("h1");
    await expect(headline).toBeVisible();

    const statusNumber = page.locator('[data-testid="status-404-number"]');
    await expect(statusNumber).toBeVisible();

    // Ensure Return to Homepage button is clickable on mobile
    const returnHomeBtn = page.getByRole("link", {
      name: /Return to Homepage/i,
    });
    await expect(returnHomeBtn).toBeVisible();

    // Verify no unexpected horizontal body overflow
    const bodyScrollWidth = await page.evaluate(
      () => document.body.scrollWidth
    );
    const windowInnerWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyScrollWidth).toBeLessThanOrEqual(windowInnerWidth + 1);
  });
});
