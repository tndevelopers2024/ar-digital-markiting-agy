import { test, expect } from "@playwright/test";

test.describe("AR Digital Marketing - Homepage E2E Test Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("ar-preloader-seen", "1");
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 1. Page Health & SEO Structure                                             */
  /* -------------------------------------------------------------------------- */
  test("1. Page Health & SEO Structure", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/AR Digital Marketing/i);

    // Wait for preloader to dismiss
    const preloader = page.locator(".ar-preloader");
    if (await preloader.count() > 0) {
      await expect(preloader).toHaveCount(0, { timeout: 8000 });
    }

    // Exactly one h1 element on the page
    const h1Locators = page.locator("h1");
    await expect(h1Locators).toHaveCount(1);
    await expect(h1Locators.first()).toBeVisible({ timeout: 8000 });

    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    expect(await page.locator("nav").count()).toBeGreaterThanOrEqual(1);
    expect(await page.locator("section").count()).toBeGreaterThanOrEqual(4);

    // Brand logo is visible with valid alt text and non-zero dimensions
    const brandLogo = page.locator('header img[alt*="AR Digital Marketing"]').first();
    await expect(brandLogo).toBeVisible();
    const altText = await brandLogo.getAttribute("alt");
    expect(altText).toBeTruthy();
    expect(altText?.toLowerCase()).toContain("digital marketing");

    const boundingBox = await brandLogo.boundingBox();
    expect(boundingBox).not.toBeNull();
    expect(boundingBox!.width).toBeGreaterThan(0);
    expect(boundingBox!.height).toBeGreaterThan(0);
  });

  /* -------------------------------------------------------------------------- */
  /* 2. Desktop Navigation & Anchor Jumps                                       */
  /* -------------------------------------------------------------------------- */
  test("2. Desktop Navigation & Anchor Jumps", async ({ page }) => {
    // Explicitly set desktop viewport to ensure desktop nav is rendered
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const anchorSections = [
      { href: "#process", sectionId: "process" },
      { href: "#faqs", sectionId: "faqs" },
    ];

    // Check /about link is visible
    const aboutLink = page.locator('header nav[aria-label="Main Navigation"] a[href="/about"]').first();
    await expect(aboutLink).toBeVisible();

    for (const item of anchorSections) {
      // Scoped specifically to Main Navigation
      const navLink = page.locator(`header nav[aria-label="Main Navigation"] a[href="${item.href}"]`).first();
      await expect(navLink).toBeVisible();
      await navLink.click();

      // Ensure the target section exists and is attached to the DOM
      const targetSection = page.locator(`#${item.sectionId}`);
      await expect(targetSection).toBeAttached();
      await expect(targetSection).toBeVisible();
    }

    // Header Primary CTA: "Let's Talk" -> #inquiry
    const inquiryCta = page.locator('header a[href="#inquiry"]').first();
    await expect(inquiryCta).toBeVisible();
    await inquiryCta.click();

    const inquirySection = page.locator("#inquiry");
    await expect(inquirySection).toBeAttached();
    await expect(inquirySection).toBeVisible();
  });

  /* -------------------------------------------------------------------------- */
  /* 3. Mobile Viewport Interactions (375px × 667px)                            */
  /* -------------------------------------------------------------------------- */
  test("3. Mobile Viewport Interactions (375px × 667px)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const hamburgerBtn = page.locator('button[aria-label="Open mobile menu"]');
    await expect(hamburgerBtn).toBeVisible();
    await expect(hamburgerBtn).toHaveAttribute("aria-expanded", "false");

    // Clicking hamburger opens mobile drawer
    await hamburgerBtn.click();
    await expect(hamburgerBtn).toHaveAttribute("aria-expanded", "true");

    const drawer = page.locator('div[role="dialog"][aria-label="Navigation Menu"]');
    await expect(drawer).toBeVisible();

    // Pressing Escape closes drawer
    await page.keyboard.press("Escape");
    await expect(drawer).not.toBeVisible();
    await expect(hamburgerBtn).toHaveAttribute("aria-expanded", "false");

    // Re-open and verify clicking a nav link inside drawer closes drawer and navigates to target section
    await hamburgerBtn.click();
    await expect(drawer).toBeVisible();

    const drawerServicesLink = drawer.locator('a[href="#services"]');
    await expect(drawerServicesLink).toBeVisible();
    await drawerServicesLink.click();

    await expect(drawer).not.toBeVisible();
    await expect(page.locator("#services")).toBeVisible();
  });

  /* -------------------------------------------------------------------------- */
  /* 4. Service Pre-Selection Flow                                              */
  /* -------------------------------------------------------------------------- */
  test("4. Service Pre-Selection Flow", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // 1. Locate the service card for "Branding & Graphic Design"
    const brandingCard = page
      .locator("#services div.group")
      .filter({ hasText: "Branding & Graphic Design" })
      .first();
    await expect(brandingCard).toBeVisible();

    const brandingInquireBtn = brandingCard.locator("button", {
      hasText: "Inquire about this service",
    });
    await brandingInquireBtn.scrollIntoViewIfNeeded();
    await brandingInquireBtn.click();

    // Verify #inquiry is targeted
    const inquirySection = page.locator("#inquiry");
    await expect(inquirySection).toBeVisible();

    // Verify "Branding & Graphic Design" pill is active in the inquiry section
    const brandingPill = inquirySection.locator('button:has-text("Branding & Graphic Design")');
    await expect(brandingPill).toHaveClass(/ring-brand-blue/);

    // 2. Select another service: "Paid Advertising"
    const paidAdsCard = page
      .locator("#services div.group")
      .filter({ hasText: "Paid Advertising" })
      .first();
    await paidAdsCard.scrollIntoViewIfNeeded();
    const paidAdsInquireBtn = paidAdsCard.locator("button", {
      hasText: "Inquire about this service",
    });
    await paidAdsInquireBtn.click();

    // Verify "Paid Advertising" is now active and "Branding & Graphic Design" is deselected
    const paidAdsPill = inquirySection.locator('button:has-text("Paid Advertising")');
    await expect(paidAdsPill).toHaveClass(/ring-brand-blue/);
    await expect(brandingPill).not.toHaveClass(/ring-brand-blue/);
  });

  /* -------------------------------------------------------------------------- */
  /* 5. FAQ Accordion Accessibility                                             */
  /* -------------------------------------------------------------------------- */
  test("5. FAQ Accordion Accessibility", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const faqSection = page.locator("#faqs");
    await faqSection.scrollIntoViewIfNeeded();
    await expect(faqSection).toBeVisible();

    // Check first item state (first item is open by default)
    const firstButton = faqSection.locator("button[aria-controls]").nth(0);
    const firstPanelId = await firstButton.getAttribute("aria-controls");
    expect(firstPanelId).toBeTruthy();
    const firstPanel = page.locator(`#${firstPanelId}`);
    await expect(firstButton).toHaveAttribute("aria-expanded", "true");
    await expect(firstPanel).toBeVisible();

    // Second FAQ item: should be collapsed by default
    const secondButton = faqSection.locator("button[aria-controls]").nth(1);
    const secondPanelId = await secondButton.getAttribute("aria-controls");
    expect(secondPanelId).toBeTruthy();
    const secondPanel = page.locator(`#${secondPanelId}`);

    await expect(secondButton).toHaveAttribute("aria-expanded", "false");
    await expect(secondPanel).toBeHidden();

    // Click second question: toggles open
    await secondButton.click();
    await expect(secondButton).toHaveAttribute("aria-expanded", "true");
    await expect(secondPanel).toBeVisible();

    // Click again: toggles collapsed
    await secondButton.click();
    await expect(secondButton).toHaveAttribute("aria-expanded", "false");
    await expect(secondPanel).toBeHidden();

    // Keyboard interaction test: Space / Enter toggling
    await secondButton.focus();
    await page.keyboard.press("Space");
    await expect(secondButton).toHaveAttribute("aria-expanded", "true");
    await expect(secondPanel).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(secondButton).toHaveAttribute("aria-expanded", "false");
    await expect(secondPanel).toBeHidden();
  });

  /* -------------------------------------------------------------------------- */
  /* 6. Inquiry Form & Spam Defense                                             */
  /* -------------------------------------------------------------------------- */
  test("6. Inquiry Form & Spam Defense", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const inquirySection = page.locator("#inquiry");
    await inquirySection.scrollIntoViewIfNeeded();

    // 1. All required inputs with labels render
    const nameInput = page.locator("#client-name");
    const emailInput = page.locator("#client-email");
    const messageInput = page.locator("#project-details");

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();

    // Check accessible labels
    await expect(page.locator('label[for="client-name"]')).toBeVisible();
    await expect(page.locator('label[for="client-email"]')).toBeVisible();
    await expect(page.locator('label[for="project-details"]')).toBeVisible();

    // 2. Honeypot spam field exists and is hidden from visual users
    const honeypot = page.locator('input[name="website"]');
    await expect(honeypot).toBeAttached();
    await expect(honeypot).toBeHidden();

    // 3. Validation on empty submit
    const submitBtn = inquirySection.locator('button[type="submit"]');
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();

    // Form errors should be visible
    await expect(page.locator("#name-error")).toBeVisible();
    await expect(page.locator("#name-error")).toContainText(/please provide your name/i);
    await expect(page.locator("#email-error")).toBeVisible();
    await expect(page.locator("#email-error")).toContainText(/please provide your email address/i);
    await expect(page.locator("#message-error")).toBeVisible();
    await expect(page.locator("#message-error")).toContainText(/please share a few details/i);

    // 4. Fill valid data and submit -> verifies offline notice banner
    await nameInput.fill("Mohan Developer");
    await emailInput.fill("mohan@example.com");
    await messageInput.fill("Looking for strategic marketing partnership and search expansion.");

    await submitBtn.click();

    // Alert notice renders
    const alertBanner = inquirySection.locator('div[role="alert"]');
    await expect(alertBanner).toBeVisible();
    await expect(alertBanner).toContainText(/offline|direct database submission/i);
  });

  /* -------------------------------------------------------------------------- */
  /* 7. Accessibility & Responsive Consistency across viewports                 */
  /* -------------------------------------------------------------------------- */
  const testViewports = [
    { name: "Mobile (375px)", width: 375, height: 667 },
    { name: "Tablet (768px)", width: 768, height: 1024 },
    { name: "Desktop (1440px)", width: 1440, height: 900 },
  ];

  for (const vp of testViewports) {
    test(`7. Accessibility & Responsive Consistency - ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Verify no horizontal overflow/scrollbar
      const overflowInfo = await page.evaluate(() => {
        const doc = document.documentElement;
        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
        };
      });

      // scrollWidth must be within 1px of clientWidth (accounting for browser subpixel rounding)
      expect(overflowInfo.scrollWidth).toBeLessThanOrEqual(overflowInfo.clientWidth + 1);

      // Wait for preloader to dismiss
      const preloader = page.locator(".ar-preloader");
      if (await preloader.count() > 0) {
        await expect(preloader).toHaveCount(0, { timeout: 8000 });
      }

      // Verify essential sections remain visible
      await expect(page.locator("header").first()).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
      await expect(page.locator("h1")).toBeVisible({ timeout: 8000 });
    });
  }
});
