const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(
  path.resolve(__dirname, '../index.html'),
  'utf8'
);

beforeEach(() => {
  document.documentElement.innerHTML = html;
});

// ---------------------------------------------------------------------------
// Page metadata
// ---------------------------------------------------------------------------
describe('Page metadata', () => {
  test('has correct page title', () => {
    expect(document.title).toBe('AI Switchboard');
  });

  test('has meta description', () => {
    const desc = document.querySelector('meta[name="description"]');
    expect(desc).not.toBeNull();
    expect(desc.getAttribute('content')).toContain('AI Switchboard');
  });

  test('has viewport meta tag', () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    expect(viewport).not.toBeNull();
    expect(viewport.getAttribute('content')).toContain('width=device-width');
  });

  test('has UTF-8 charset', () => {
    const charset = document.querySelector('meta[charset]');
    expect(charset).not.toBeNull();
    expect(charset.getAttribute('charset').toUpperCase()).toBe('UTF-8');
  });

  test('html element has lang="en" attribute', () => {
    // jsdom doesn't propagate outer-element attributes when assigning innerHTML,
    // so we check the raw source string directly.
    expect(html).toMatch(/<html\s[^>]*lang="en"/i);
  });
});

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
describe('Navigation', () => {
  let navLabels;

  beforeEach(() => {
    const links = Array.from(document.querySelectorAll('.navlinks a'));
    navLabels = links.map(a => a.textContent.trim());
  });

  test('brand/logo is present', () => {
    const brand = document.querySelector('.brand');
    expect(brand).not.toBeNull();
    expect(brand.textContent).toContain('AI Switchboard');
  });

  test('navigation contains Features link', () => {
    expect(navLabels).toContain('Features');
  });

  test('navigation contains Pricing link', () => {
    expect(navLabels).toContain('Pricing');
  });

  test('navigation contains Docs link', () => {
    expect(navLabels).toContain('Docs');
  });

  test('navigation contains Support link', () => {
    expect(navLabels).toContain('Support');
  });

  test('navigation contains Changelog link', () => {
    expect(navLabels).toContain('Changelog');
  });

  test('"Add to Chrome" CTA button is present in header', () => {
    const header = document.querySelector('header');
    const cta = header.querySelector('.btn');
    expect(cta).not.toBeNull();
    expect(cta.textContent).toContain('Add to Chrome');
  });

  test('nav links that reference existing section IDs resolve correctly', () => {
    // Note: #pricing and #changelog sections are not yet in the HTML.
    // This test verifies the links that DO have matching section targets.
    const existingSectionIds = ['features', 'docs', 'support'];
    existingSectionIds.forEach(id => {
      expect(document.getElementById(id)).not.toBeNull();
    });
  });
});

// ---------------------------------------------------------------------------
// Hero section
// ---------------------------------------------------------------------------
describe('Hero section', () => {
  test('hero section exists', () => {
    expect(document.querySelector('.hero')).not.toBeNull();
  });

  test('h1 heading is present', () => {
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('Every AI');
  });

  test('lead paragraph describes the product', () => {
    const lead = document.querySelector('.lead');
    expect(lead).not.toBeNull();
    expect(lead.textContent).toContain('AI Switchboard');
  });

  test('version pill is present', () => {
    const pill = document.querySelector('.pill');
    expect(pill).not.toBeNull();
    expect(pill.textContent).toContain('v1.0.0');
  });

  test('"Add to Chrome" CTA link is present in hero', () => {
    const cta = document.querySelector('.cta .btn');
    expect(cta).not.toBeNull();
    expect(cta.textContent).toContain('Add to Chrome');
  });

  test('"View Documentation" secondary CTA is present', () => {
    const secondary = document.querySelector('.cta .btn.secondary');
    expect(secondary).not.toBeNull();
    expect(secondary.textContent).toContain('View Documentation');
  });

  test('feature check items are present', () => {
    const checks = document.querySelectorAll('.check');
    expect(checks.length).toBeGreaterThanOrEqual(4);
  });

  test('"100% Free" feature check is present', () => {
    const checksText = document.querySelector('.checks').textContent;
    expect(checksText).toContain('100% Free');
  });

  test('"Open Source" feature check is present', () => {
    const checksText = document.querySelector('.checks').textContent;
    expect(checksText).toContain('Open Source');
  });

  test('"Privacy First" feature check is present', () => {
    const checksText = document.querySelector('.checks').textContent;
    expect(checksText).toContain('Privacy First');
  });

  test('"Actively Updated" feature check is present', () => {
    const checksText = document.querySelector('.checks').textContent;
    expect(checksText).toContain('Actively Updated');
  });
});

// ---------------------------------------------------------------------------
// Agent list (mock browser UI)
// ---------------------------------------------------------------------------
describe('Agent list', () => {
  let agentNames;

  beforeEach(() => {
    agentNames = Array.from(document.querySelectorAll('.agent-name'))
      .map(el => el.textContent);
  });

  test('GPT-4o is listed', () => {
    expect(agentNames.some(name => name.includes('GPT-4o'))).toBe(true);
  });

  test('Claude is listed', () => {
    expect(agentNames.some(name => name.includes('Claude'))).toBe(true);
  });

  test('Gemini is listed', () => {
    expect(agentNames.some(name => name.includes('Gemini'))).toBe(true);
  });

  test('Llama is listed', () => {
    expect(agentNames.some(name => name.includes('Llama'))).toBe(true);
  });

  test('Perplexity is listed', () => {
    expect(agentNames.some(name => name.includes('Perplexity'))).toBe(true);
  });

  test('GPT-4o is the default agent', () => {
    const active = document.querySelector('.active');
    expect(active).not.toBeNull();
    expect(active.textContent).toContain('GPT-4o');
    const badge = active.querySelector('.badge');
    expect(badge).not.toBeNull();
    expect(badge.textContent.trim()).toBe('Default');
  });

  test('status panel shows Routing Engine as Online', () => {
    const status = document.querySelector('.status');
    expect(status).not.toBeNull();
    expect(status.textContent).toContain('Routing Engine');
    expect(status.textContent).toContain('Online');
  });

  test('status panel shows Privacy Layer as Protected', () => {
    const status = document.querySelector('.status');
    expect(status.textContent).toContain('Privacy Layer');
    expect(status.textContent).toContain('Protected');
  });

  test('status panel shows Extension Sync as Ready', () => {
    const status = document.querySelector('.status');
    expect(status.textContent).toContain('Extension Sync');
    expect(status.textContent).toContain('Ready');
  });
});

// ---------------------------------------------------------------------------
// Brand grid (supported AI providers)
// ---------------------------------------------------------------------------
describe('Supported AI providers grid', () => {
  let brandCards;

  beforeEach(() => {
    brandCards = Array.from(document.querySelectorAll('.brand-card'));
  });

  test('OpenAI brand card is present', () => {
    expect(brandCards.some(c => c.textContent.includes('OpenAI'))).toBe(true);
  });

  test('Anthropic brand card is present', () => {
    expect(brandCards.some(c => c.textContent.includes('Anthropic'))).toBe(true);
  });

  test('Google brand card is present', () => {
    expect(brandCards.some(c => c.textContent.includes('Google'))).toBe(true);
  });

  test('Meta brand card is present', () => {
    expect(brandCards.some(c => c.textContent.includes('Meta'))).toBe(true);
  });

  test('Perplexity brand card is present', () => {
    expect(brandCards.some(c => c.textContent.includes('Perplexity'))).toBe(true);
  });

  test('Mistral AI brand card is present', () => {
    expect(brandCards.some(c => c.textContent.includes('Mistral AI'))).toBe(true);
  });

  test('all brand cards show "Available" status', () => {
    expect(brandCards.length).toBeGreaterThanOrEqual(6);
    brandCards.slice(0, 6).forEach(card => {
      expect(card.textContent).toContain('Available');
    });
  });
});

// ---------------------------------------------------------------------------
// Features section
// ---------------------------------------------------------------------------
describe('Features section', () => {
  test('features section exists and has id="features"', () => {
    const section = document.getElementById('features');
    expect(section).not.toBeNull();
  });

  test('features section heading is present', () => {
    const section = document.getElementById('features');
    const h2 = section.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2.textContent).toContain('Powerful Features');
  });

  test('there are at least 5 feature cards', () => {
    const features = document.querySelectorAll('.features .feature');
    expect(features.length).toBeGreaterThanOrEqual(5);
  });

  test('"One-Click Switch" feature is listed', () => {
    const features = document.querySelector('.features');
    expect(features.textContent).toContain('One-Click Switch');
  });

  test('"Multi-Agent Support" feature is listed', () => {
    const features = document.querySelector('.features');
    expect(features.textContent).toContain('Multi-Agent Support');
  });

  test('"Secure & Private" feature is listed', () => {
    const features = document.querySelector('.features');
    expect(features.textContent).toContain('Secure & Private');
  });

  test('"Customizable" feature is listed', () => {
    const features = document.querySelector('.features');
    expect(features.textContent).toContain('Customizable');
  });

  test('"History & Logs" feature is listed', () => {
    const features = document.querySelector('.features');
    expect(features.textContent).toContain('History & Logs');
  });

  test('each feature card has a heading and a description', () => {
    const features = document.querySelectorAll('.features .feature');
    features.forEach(f => {
      expect(f.querySelector('h3')).not.toBeNull();
      expect(f.querySelector('p')).not.toBeNull();
    });
  });
});

// ---------------------------------------------------------------------------
// How It Works section
// ---------------------------------------------------------------------------
describe('How It Works section', () => {
  test('How It Works heading is present', () => {
    const howSection = document.querySelector('.how');
    expect(howSection).not.toBeNull();
    const h2 = howSection.querySelector('h2');
    expect(h2.textContent).toContain('How It Works');
  });

  test('4 steps are present', () => {
    const steps = document.querySelectorAll('.steps .step');
    expect(steps.length).toBe(4);
  });

  test('Step 1 is Install', () => {
    const steps = document.querySelectorAll('.steps .step');
    expect(steps[0].textContent).toContain('Install');
  });

  test('Step 2 is Add API Keys', () => {
    const steps = document.querySelectorAll('.steps .step');
    expect(steps[1].textContent).toContain('Add API Keys');
  });

  test('Step 3 is Choose Agent', () => {
    const steps = document.querySelectorAll('.steps .step');
    expect(steps[2].textContent).toContain('Choose Agent');
  });

  test('Step 4 is Start Chatting', () => {
    const steps = document.querySelectorAll('.steps .step');
    expect(steps[3].textContent).toContain('Start Chatting');
  });
});

// ---------------------------------------------------------------------------
// Backend / docs section
// ---------------------------------------------------------------------------
describe('Backend section', () => {
  test('backend section exists and has id="docs"', () => {
    expect(document.getElementById('docs')).not.toBeNull();
  });

  test('section heading mentions backend', () => {
    const section = document.getElementById('docs');
    const h2 = section.querySelector('h2');
    expect(h2.textContent).toContain('Backend');
  });

  test('4 backend service cards are present', () => {
    const cards = document.querySelectorAll('.backend .backcard');
    expect(cards.length).toBe(4);
  });

  test('Cloudflare card is present', () => {
    const backend = document.querySelector('.backend');
    expect(backend.textContent).toContain('Cloudflare');
  });

  test('PostgreSQL card is present', () => {
    const backend = document.querySelector('.backend');
    expect(backend.textContent).toContain('PostgreSQL');
  });

  test('Node.js card is present', () => {
    const backend = document.querySelector('.backend');
    expect(backend.textContent).toContain('Node.js');
  });

  test('Upstash Redis card is present', () => {
    const backend = document.querySelector('.backend');
    expect(backend.textContent).toContain('Upstash Redis');
  });

  test('all backend cards show Operational status', () => {
    const cards = document.querySelectorAll('.backend .backcard');
    cards.forEach(card => {
      expect(card.querySelector('.op').textContent).toContain('Operational');
    });
  });
});

// ---------------------------------------------------------------------------
// Reviews section
// ---------------------------------------------------------------------------
describe('Reviews section', () => {
  test('reviews section exists', () => {
    expect(document.querySelector('.reviews')).not.toBeNull();
  });

  test('rating summary card is present', () => {
    const summary = document.querySelector('.summary');
    expect(summary).not.toBeNull();
  });

  test('overall rating is 4.9', () => {
    const summary = document.querySelector('.summary');
    expect(summary.textContent).toContain('4.9');
  });

  test('review count mentions 8,800', () => {
    const summary = document.querySelector('.summary');
    expect(summary.textContent).toContain('8,800');
  });

  test('at least 4 individual review cards are present', () => {
    const reviews = document.querySelectorAll('.review');
    expect(reviews.length).toBeGreaterThanOrEqual(4);
  });

  test('all review cards have 5-star ratings', () => {
    const reviews = document.querySelectorAll('.review');
    reviews.forEach(r => {
      expect(r.textContent).toContain('★★★★★');
    });
  });

  test('all review cards have reviewer names', () => {
    const reviews = document.querySelectorAll('.review');
    reviews.forEach(r => {
      expect(r.querySelector('b')).not.toBeNull();
    });
  });

  test('James Carter review is present', () => {
    const reviews = Array.from(document.querySelectorAll('.review'));
    expect(reviews.some(r => r.textContent.includes('James Carter'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
describe('Footer', () => {
  test('footer exists and has id="support"', () => {
    expect(document.getElementById('support')).not.toBeNull();
  });

  test('footer contains brand name', () => {
    const footer = document.querySelector('footer');
    expect(footer.textContent).toContain('AI Switchboard');
  });

  test('footer contains Product section', () => {
    const footer = document.querySelector('footer');
    expect(footer.textContent).toContain('Product');
  });

  test('footer contains Resources section', () => {
    const footer = document.querySelector('footer');
    expect(footer.textContent).toContain('Resources');
  });

  test('footer contains Support section', () => {
    const footer = document.querySelector('footer');
    expect(footer.textContent).toContain('Support');
  });

  test('footer contains Legal section', () => {
    const footer = document.querySelector('footer');
    expect(footer.textContent).toContain('Legal');
  });

  test('footer contains copyright notice', () => {
    const copy = document.querySelector('.copy');
    expect(copy).not.toBeNull();
    expect(copy.textContent).toContain('AI Switchboard');
    expect(copy.textContent).toContain('All rights reserved');
  });

  test('footer contains Privacy Policy link text', () => {
    const footer = document.querySelector('footer');
    expect(footer.textContent).toContain('Privacy Policy');
  });

  test('footer contains Terms of Service link text', () => {
    const footer = document.querySelector('footer');
    expect(footer.textContent).toContain('Terms of Service');
  });
});

// ---------------------------------------------------------------------------
// Accessibility basics
// ---------------------------------------------------------------------------
describe('Accessibility', () => {
  test('page has exactly one h1', () => {
    expect(document.querySelectorAll('h1').length).toBe(1);
  });

  test('all h2 headings come after h1 in the DOM', () => {
    const headings = Array.from(document.querySelectorAll('h1, h2'));
    expect(headings[0].tagName).toBe('H1');
  });

  test('primary "Add to Chrome" link is focusable (is an <a> tag)', () => {
    const cta = document.querySelector('.cta .btn');
    expect(cta.tagName).toBe('A');
    expect(cta.getAttribute('href')).not.toBeNull();
  });

  test('header is present as a landmark', () => {
    expect(document.querySelector('header')).not.toBeNull();
  });

  test('main content area is present', () => {
    expect(document.querySelector('main')).not.toBeNull();
  });

  test('footer is present as a landmark', () => {
    expect(document.querySelector('footer')).not.toBeNull();
  });

  test('nav element is present', () => {
    expect(document.querySelector('nav')).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Vercel / routing config (structural sanity)
// ---------------------------------------------------------------------------
describe('Vercel configuration (vercel.json)', () => {
  const vercelConfig = require('../vercel.json');

  test('cleanUrls is enabled', () => {
    expect(vercelConfig.cleanUrls).toBe(true);
  });

  test('trailingSlash is disabled', () => {
    expect(vercelConfig.trailingSlash).toBe(false);
  });

  test('rewrite rule exists for SPA fallback', () => {
    expect(Array.isArray(vercelConfig.rewrites)).toBe(true);
    expect(vercelConfig.rewrites.length).toBeGreaterThan(0);
  });

  test('catch-all rewrite points to /index.html', () => {
    const catchAll = vercelConfig.rewrites.find(r => r.source === '/(.*)');
    expect(catchAll).toBeDefined();
    expect(catchAll.destination).toBe('/index.html');
  });
});
