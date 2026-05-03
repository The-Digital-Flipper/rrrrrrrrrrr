// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const PAGE_URL = `file://${path.resolve(__dirname, '..', 'index.html')}`;

test.beforeEach(async ({ page }) => {
  await page.goto(PAGE_URL);
});

// ---------------------------------------------------------------------------
// Page meta
// ---------------------------------------------------------------------------
test.describe('Page meta', () => {
  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('AI Switchboard');
  });

  test('has meta description', async ({ page }) => {
    const content = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(content).toContain('AI Switchboard');
    expect(content).toContain('browser extension');
  });

  test('has viewport meta tag', async ({ page }) => {
    const content = await page
      .locator('meta[name="viewport"]')
      .getAttribute('content');
    expect(content).toContain('width=device-width');
  });

  test('has charset meta tag', async ({ page }) => {
    const charset = await page
      .locator('meta[charset]')
      .getAttribute('charset');
    expect(charset?.toLowerCase()).toBe('utf-8');
  });
});

// ---------------------------------------------------------------------------
// Header / navigation
// ---------------------------------------------------------------------------
test.describe('Header and navigation', () => {
  test('shows brand name', async ({ page }) => {
    await expect(page.locator('header .brand')).toContainText('AI Switchboard');
  });

  test('nav contains Features link', async ({ page }) => {
    await expect(page.locator('nav.navlinks a[href="#features"]')).toBeVisible();
    await expect(page.locator('nav.navlinks a[href="#features"]')).toContainText('Features');
  });

  test('nav contains Pricing link', async ({ page }) => {
    await expect(page.locator('nav.navlinks a[href="#pricing"]')).toContainText('Pricing');
  });

  test('nav contains Docs link', async ({ page }) => {
    await expect(page.locator('nav.navlinks a[href="#docs"]')).toContainText('Docs');
  });

  test('nav contains Support link', async ({ page }) => {
    await expect(page.locator('nav.navlinks a[href="#support"]')).toContainText('Support');
  });

  test('nav contains Changelog link', async ({ page }) => {
    await expect(page.locator('nav.navlinks a[href="#changelog"]')).toContainText('Changelog');
  });

  test('header CTA button links to #features', async ({ page }) => {
    const cta = page.locator('header .btn');
    await expect(cta).toContainText('Add to Chrome');
    await expect(cta).toHaveAttribute('href', '#features');
  });
});

// ---------------------------------------------------------------------------
// Hero section
// ---------------------------------------------------------------------------
test.describe('Hero section', () => {
  test('shows version pill', async ({ page }) => {
    await expect(page.locator('.pill')).toContainText('v1.0.0');
    await expect(page.locator('.pill')).toContainText('Chrome');
  });

  test('shows main heading', async ({ page }) => {
    const h1 = page.locator('h1').first();
    await expect(h1).toContainText('One Click');
    await expect(h1).toContainText('Every AI');
    await expect(h1).toContainText('Total Control');
  });

  test('shows lead paragraph', async ({ page }) => {
    await expect(page.locator('.lead')).toContainText('AI Switchboard');
    await expect(page.locator('.lead')).toContainText('AI models');
  });

  test('primary CTA button is present and points to #features', async ({ page }) => {
    const primary = page.locator('.cta .btn').first();
    await expect(primary).toContainText('Add to Chrome');
    await expect(primary).toHaveAttribute('href', '#features');
  });

  test('secondary CTA button links to #docs', async ({ page }) => {
    const secondary = page.locator('.cta .btn.secondary');
    await expect(secondary).toContainText('Documentation');
    await expect(secondary).toHaveAttribute('href', '#docs');
  });

  test('shows four feature-check items', async ({ page }) => {
    const checks = page.locator('.checks .check');
    await expect(checks).toHaveCount(4);
  });

  test('feature checks include 100% Free, Open Source, Privacy First, Actively Updated', async ({ page }) => {
    const checks = page.locator('.checks .check b');
    await expect(checks.nth(0)).toContainText('100% Free');
    await expect(checks.nth(1)).toContainText('Open Source');
    await expect(checks.nth(2)).toContainText('Privacy First');
    await expect(checks.nth(3)).toContainText('Actively Updated');
  });
});

// ---------------------------------------------------------------------------
// Agent showcase (browser mock-up)
// ---------------------------------------------------------------------------
test.describe('Agent showcase', () => {
  test('shows three live-status stats', async ({ page }) => {
    await expect(page.locator('.stats .stat')).toHaveCount(3);
  });

  test('shows GPT-4o as the default active agent', async ({ page }) => {
    const active = page.locator('.active');
    await expect(active).toContainText('GPT-4o');
    await expect(active.locator('.badge')).toContainText('Default');
  });

  test('active agent details show Route, Mode, and Sync', async ({ page }) => {
    const details = page.locator('.active .details .detail small');
    await expect(details.nth(0)).toContainText('Route');
    await expect(details.nth(1)).toContainText('Mode');
    await expect(details.nth(2)).toContainText('Sync');
  });

  test('lists Claude 3.5 Sonnet agent', async ({ page }) => {
    await expect(page.locator('.app-right')).toContainText('Claude 3.5 Sonnet');
  });

  test('lists Gemini 1.5 Pro agent', async ({ page }) => {
    await expect(page.locator('.app-right')).toContainText('Gemini 1.5 Pro');
  });

  test('lists Llama 3.1 70B agent', async ({ page }) => {
    await expect(page.locator('.app-right')).toContainText('Llama 3.1 70B');
  });

  test('lists Perplexity Sonar agent', async ({ page }) => {
    await expect(page.locator('.app-right')).toContainText('Perplexity Sonar');
  });

  test('shows three status rows (Routing Engine, Privacy Layer, Extension Sync)', async ({ page }) => {
    const rows = page.locator('.status .status-row');
    await expect(rows).toHaveCount(3);
    await expect(rows.nth(0)).toContainText('Routing Engine');
    await expect(rows.nth(1)).toContainText('Privacy Layer');
    await expect(rows.nth(2)).toContainText('Extension Sync');
  });

  test('all three status rows show positive status', async ({ page }) => {
    const statusValues = page.locator('.status .status-row b');
    await expect(statusValues.nth(0)).toContainText('Online');
    await expect(statusValues.nth(1)).toContainText('Protected');
    await expect(statusValues.nth(2)).toContainText('Ready');
  });

  test('Manage Agents button is present', async ({ page }) => {
    await expect(page.locator('.app-right .btn.secondary')).toContainText('Manage Agents');
  });
});

// ---------------------------------------------------------------------------
// Brand grid
// ---------------------------------------------------------------------------
test.describe('Brand grid', () => {
  test('shows seven brand cards', async ({ page }) => {
    await expect(page.locator('.brand-grid .brand-card')).toHaveCount(7);
  });

  test('brand grid includes OpenAI', async ({ page }) => {
    await expect(page.locator('.brand-grid')).toContainText('OpenAI');
  });

  test('brand grid includes Anthropic', async ({ page }) => {
    await expect(page.locator('.brand-grid')).toContainText('Anthropic');
  });

  test('brand grid includes Google', async ({ page }) => {
    await expect(page.locator('.brand-grid')).toContainText('Google');
  });

  test('brand grid includes Meta', async ({ page }) => {
    await expect(page.locator('.brand-grid')).toContainText('Meta');
  });

  test('brand grid includes Perplexity', async ({ page }) => {
    await expect(page.locator('.brand-grid')).toContainText('Perplexity');
  });

  test('brand grid includes Mistral AI', async ({ page }) => {
    await expect(page.locator('.brand-grid')).toContainText('Mistral AI');
  });

  test('all brand cards show Available status', async ({ page }) => {
    const statuses = page.locator('.brand-grid .brand-card span');
    const count = await statuses.count();
    for (let i = 0; i < count; i++) {
      await expect(statuses.nth(i)).toContainText('Available');
    }
  });
});

// ---------------------------------------------------------------------------
// Real-panels / workflow cards
// ---------------------------------------------------------------------------
test.describe('Workflow / real-panels section', () => {
  test('shows three workflow panels', async ({ page }) => {
    await expect(page.locator('.real-panels .real-panel')).toHaveCount(3);
  });

  test('first panel eyebrow says "Real workflow"', async ({ page }) => {
    await expect(page.locator('.real-panels .real-panel').nth(0).locator('.eyebrow')).toContainText('Real workflow');
  });

  test('second panel eyebrow says "Reliable setup"', async ({ page }) => {
    await expect(page.locator('.real-panels .real-panel').nth(1).locator('.eyebrow')).toContainText('Reliable setup');
  });

  test('third panel eyebrow says "Premium control"', async ({ page }) => {
    await expect(page.locator('.real-panels .real-panel').nth(2).locator('.eyebrow')).toContainText('Premium control');
  });
});

// ---------------------------------------------------------------------------
// Features section
// ---------------------------------------------------------------------------
test.describe('Features section', () => {
  test('section has id="features"', async ({ page }) => {
    await expect(page.locator('section#features')).toBeAttached();
  });

  test('section heading says "Powerful Features"', async ({ page }) => {
    await expect(page.locator('section#features h2')).toContainText('Powerful Features');
  });

  test('shows five feature cards', async ({ page }) => {
    await expect(page.locator('section#features .feature')).toHaveCount(5);
  });

  test('feature: One-Click Switch', async ({ page }) => {
    await expect(page.locator('section#features')).toContainText('One-Click Switch');
  });

  test('feature: Multi-Agent Support', async ({ page }) => {
    await expect(page.locator('section#features')).toContainText('Multi-Agent Support');
  });

  test('feature: Secure & Private', async ({ page }) => {
    await expect(page.locator('section#features')).toContainText('Secure & Private');
  });

  test('feature: Customizable', async ({ page }) => {
    await expect(page.locator('section#features')).toContainText('Customizable');
  });

  test('feature: History & Logs', async ({ page }) => {
    await expect(page.locator('section#features')).toContainText('History & Logs');
  });

  test('each feature card has a title and description', async ({ page }) => {
    const features = page.locator('section#features .feature');
    const count = await features.count();
    for (let i = 0; i < count; i++) {
      const card = features.nth(i);
      await expect(card.locator('h3')).not.toBeEmpty();
      await expect(card.locator('p')).not.toBeEmpty();
    }
  });
});

// ---------------------------------------------------------------------------
// How It Works section
// ---------------------------------------------------------------------------
test.describe('How It Works section', () => {
  test('section heading says "How It Works"', async ({ page }) => {
    await expect(page.locator('.how h2')).toContainText('How It Works');
  });

  test('shows four steps', async ({ page }) => {
    await expect(page.locator('.steps .step')).toHaveCount(4);
  });

  test('Step 1: Install', async ({ page }) => {
    const step1 = page.locator('.steps .step').nth(0);
    await expect(step1.locator('small')).toContainText('Step 1');
    await expect(step1.locator('h3')).toContainText('Install');
  });

  test('Step 2: Add API Keys', async ({ page }) => {
    const step2 = page.locator('.steps .step').nth(1);
    await expect(step2.locator('small')).toContainText('Step 2');
    await expect(step2.locator('h3')).toContainText('Add API Keys');
  });

  test('Step 3: Choose Agent', async ({ page }) => {
    const step3 = page.locator('.steps .step').nth(2);
    await expect(step3.locator('small')).toContainText('Step 3');
    await expect(step3.locator('h3')).toContainText('Choose Agent');
  });

  test('Step 4: Start Chatting', async ({ page }) => {
    const step4 = page.locator('.steps .step').nth(3);
    await expect(step4.locator('small')).toContainText('Step 4');
    await expect(step4.locator('h3')).toContainText('Start Chatting');
  });

  test('each step has a description', async ({ page }) => {
    const steps = page.locator('.steps .step');
    const count = await steps.count();
    for (let i = 0; i < count; i++) {
      await expect(steps.nth(i).locator('p')).not.toBeEmpty();
    }
  });
});

// ---------------------------------------------------------------------------
// Backend section
// ---------------------------------------------------------------------------
test.describe('Backend / infrastructure section', () => {
  test('section has id="docs"', async ({ page }) => {
    await expect(page.locator('section#docs')).toBeAttached();
  });

  test('section heading says "Powered By A Solid Backend"', async ({ page }) => {
    await expect(page.locator('section#docs h2')).toContainText('Powered By A Solid Backend');
  });

  test('shows four backend cards', async ({ page }) => {
    await expect(page.locator('.backend .backcard')).toHaveCount(4);
  });

  test('backcard: Cloudflare', async ({ page }) => {
    await expect(page.locator('.backend')).toContainText('Cloudflare');
  });

  test('backcard: PostgreSQL', async ({ page }) => {
    await expect(page.locator('.backend')).toContainText('PostgreSQL');
  });

  test('backcard: Node.js', async ({ page }) => {
    await expect(page.locator('.backend')).toContainText('Node.js');
  });

  test('backcard: Upstash Redis', async ({ page }) => {
    await expect(page.locator('.backend')).toContainText('Upstash Redis');
  });

  test('all backend cards show Operational status', async ({ page }) => {
    const statuses = page.locator('.backend .backcard .op');
    const count = await statuses.count();
    for (let i = 0; i < count; i++) {
      await expect(statuses.nth(i)).toContainText('Operational');
    }
  });
});

// ---------------------------------------------------------------------------
// Reviews / ratings section
// ---------------------------------------------------------------------------
test.describe('Reviews section', () => {
  test('shows rating of 4.9', async ({ page }) => {
    await expect(page.locator('.summary .rating strong')).toContainText('4.9');
  });

  test('shows review count of 8,800', async ({ page }) => {
    await expect(page.locator('.summary')).toContainText('8,800');
  });

  test('shows five-star rating bars for 3 star levels', async ({ page }) => {
    await expect(page.locator('.summary .bar-row')).toHaveCount(3);
  });

  test('shows four individual reviews', async ({ page }) => {
    await expect(page.locator('.reviews .review')).toHaveCount(4);
  });

  test('review by James Carter is present', async ({ page }) => {
    await expect(page.locator('.reviews')).toContainText('James Carter');
  });

  test('review by Sophia Bennett is present', async ({ page }) => {
    await expect(page.locator('.reviews')).toContainText('Sophia Bennett');
  });

  test('review by Daniel Lee is present', async ({ page }) => {
    await expect(page.locator('.reviews')).toContainText('Daniel Lee');
  });

  test('review by Emily Rodriguez is present', async ({ page }) => {
    await expect(page.locator('.reviews')).toContainText('Emily Rodriguez');
  });

  test('all reviews show five-star rating', async ({ page }) => {
    const starElems = page.locator('.reviews .review .stars');
    const count = await starElems.count();
    for (let i = 0; i < count; i++) {
      await expect(starElems.nth(i)).toContainText('★★★★★');
    }
  });

  test('all individual reviews include verified badge', async ({ page }) => {
    const verified = page.locator('.reviews .review .verified');
    const count = await verified.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(verified.nth(i)).toContainText('Verified');
    }
  });

  test('all reviews have a review text paragraph', async ({ page }) => {
    const reviews = page.locator('.reviews .review');
    const count = await reviews.count();
    for (let i = 0; i < count; i++) {
      await expect(reviews.nth(i).locator('p')).not.toBeEmpty();
    }
  });
});

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
test.describe('Footer', () => {
  test('footer has id="support"', async ({ page }) => {
    await expect(page.locator('footer#support')).toBeAttached();
  });

  test('footer shows brand name', async ({ page }) => {
    await expect(page.locator('footer .brand')).toContainText('AI Switchboard');
  });

  test('footer has Product column', async ({ page }) => {
    await expect(page.locator('footer')).toContainText('Product');
  });

  test('footer has Resources column', async ({ page }) => {
    await expect(page.locator('footer')).toContainText('Resources');
  });

  test('footer has Support column', async ({ page }) => {
    await expect(page.locator('footer')).toContainText('Support');
  });

  test('footer has Legal column', async ({ page }) => {
    await expect(page.locator('footer')).toContainText('Legal');
  });

  test('footer shows copyright notice', async ({ page }) => {
    await expect(page.locator('.copy')).toContainText('AI Switchboard');
    await expect(page.locator('.copy')).toContainText('All rights reserved');
  });

  test('footer lists Features, Pricing, Roadmap under Product', async ({ page }) => {
    await expect(page.locator('footer')).toContainText('Features');
    await expect(page.locator('footer')).toContainText('Pricing');
    await expect(page.locator('footer')).toContainText('Roadmap');
  });

  test('footer lists Documentation, API Reference, Guides under Resources', async ({ page }) => {
    await expect(page.locator('footer')).toContainText('Documentation');
    await expect(page.locator('footer')).toContainText('API Reference');
    await expect(page.locator('footer')).toContainText('Guides');
  });

  test('footer lists Privacy Policy and Terms of Service under Legal', async ({ page }) => {
    await expect(page.locator('footer')).toContainText('Privacy Policy');
    await expect(page.locator('footer')).toContainText('Terms of Service');
  });
});

// ---------------------------------------------------------------------------
// In-page anchor / section IDs
// ---------------------------------------------------------------------------
test.describe('Section anchor IDs', () => {
  test('features section has id="features"', async ({ page }) => {
    await expect(page.locator('#features')).toBeAttached();
  });

  test('docs section has id="docs"', async ({ page }) => {
    await expect(page.locator('#docs')).toBeAttached();
  });

  test('support section (footer) has id="support"', async ({ page }) => {
    await expect(page.locator('#support')).toBeAttached();
  });
});
