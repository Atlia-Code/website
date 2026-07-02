import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = join(rootDir, "public");
const siteUrl = "https://www.atlia.com";
const lastmod = "2026-07-02";

const sourceLinks = {
  vacationRental: {
    label: "Vacation rental management commission ranges",
    url: "https://en.wikipedia.org/wiki/Vacation_rental",
  },
  airbnbCohost: {
    label: "Airbnb Co-Host Network payout options",
    url: "https://www.theverge.com/2024/10/16/24271838/airbnb-co-host-network-manage-listing-2024-winter-release",
  },
  vacasa: {
    label: "Vacasa public company overview",
    url: "https://en.wikipedia.org/wiki/Vacasa",
  },
};

const pages = [
  {
    slug: "airbnb-management-fee-calculator",
    title: "Airbnb Management Fee Calculator | Atlia",
    description:
      "Estimate the annual fee difference between a traditional Airbnb property manager and Atlia's 10% short-term rental management fee.",
    h1: "Airbnb management fee calculator",
    eyebrow: "Free owner tool",
    lede:
      "Use this calculator to model how much a lower management fee can change owner income before any revenue lift, occupancy change, or operating improvement.",
    primaryCta: "Sign up for Atlia",
    sections: [
      {
        title: "The simple fee formula",
        body:
          "<p>Annual management fee equals annual booking revenue multiplied by the manager's fee percentage. Atlia's management fee is 10% of booking revenue.</p><div class=\"formula\">Annual savings = revenue x (current manager fee - 10%)</div>",
      },
      {
        title: "Example savings",
        body:
          "<table><thead><tr><th>Annual booking revenue</th><th>Current manager fee</th><th>Atlia fee</th><th>Annual fee savings</th></tr></thead><tbody><tr><td>$60,000</td><td>30%</td><td>10%</td><td>$12,000</td></tr><tr><td>$100,000</td><td>25%</td><td>10%</td><td>$15,000</td></tr><tr><td>$150,000</td><td>30%</td><td>10%</td><td>$30,000</td></tr></tbody></table><p>These examples are fee math only. Actual owner income also depends on occupancy, nightly rates, cleaning costs, maintenance, platform fees, taxes, and local rules.</p>",
      },
      {
        title: "What the calculator does not assume",
        body:
          "<ul><li>No guaranteed revenue increase.</li><li>No assumption that every property is eligible for short-term rental use.</li><li>No estimate of taxes, permits, insurance, cleaning, repairs, utilities, or furnishing costs.</li><li>No claim that a lower fee is the only factor that matters. Service quality and guest experience still matter.</li></ul>",
      },
    ],
    faqs: [
      {
        q: "How do I calculate Airbnb management fees?",
        a: "Multiply annual booking revenue by the manager's fee percentage. A property earning $60,000 per year with a 30% manager pays $18,000 in management fees before other costs.",
      },
      {
        q: "How much does Atlia charge?",
        a: "Atlia charges a 10% management fee for short-term rental property management.",
      },
      {
        q: "Does this calculator estimate total profit?",
        a: "No. It estimates management fee difference only. Net profit also depends on revenue, cleaning, repairs, utilities, platform fees, taxes, local compliance, and other property costs.",
      },
    ],
    sources: [sourceLinks.vacationRental],
  },
  {
    slug: "airbnb-management-fees",
    title: "Airbnb Management Fees: What Owners Pay | Atlia",
    description:
      "Understand Airbnb management fee models, what percentage-based managers charge for, and how Atlia's 10% fee changes the math.",
    h1: "Airbnb management fees, explained",
    eyebrow: "Owner guide",
    lede:
      "Airbnb management fees can look simple on the surface, but the real question is what percentage of every booking you keep as the owner.",
    primaryCta: "Calculate fee savings",
    sections: [
      {
        title: "Common fee models",
        body:
          "<p>Short-term rental managers often use percentage-of-revenue pricing, flat monthly pricing, or a hybrid model with add-on charges. Percentage pricing is easy to understand, but it scales up as your property performs better.</p>",
      },
      {
        title: "What owners should compare",
        body:
          "<ul><li>Management fee percentage.</li><li>What is included in guest communication, pricing, turnovers, reporting, and maintenance coordination.</li><li>Whether cleaning, repairs, onboarding, linens, supplies, or platform fees are billed separately.</li><li>How fast guests and owners get responses.</li><li>Whether the manager improves net owner income, not just gross revenue.</li></ul>",
      },
      {
        title: "How Atlia prices management",
        body:
          "<p>Atlia charges a 10% management fee and is built to run the operational work owners usually do themselves: guest messages, cleaner coordination, pricing checks, owner reporting, and property-specific decisions with operator oversight.</p>",
      },
    ],
    faqs: [
      {
        q: "What is a good Airbnb management fee?",
        a: "A good fee depends on service quality, included work, revenue performance, and how much owner time the manager saves. Compare net owner income, not just the headline percentage.",
      },
      {
        q: "Why does a lower management fee matter?",
        a: "A lower fee leaves more booking revenue with the owner. On $100,000 in annual revenue, each 10 percentage points of management fee equals $10,000 per year.",
      },
      {
        q: "Does Atlia replace cleaners and vendors?",
        a: "Atlia coordinates operations and can work with approved cleaners and vendors. The goal is to remove repetitive owner coordination while keeping clear visibility.",
      },
    ],
    sources: [sourceLinks.vacationRental],
  },
  {
    slug: "airbnb-property-management-cost",
    title: "Airbnb Property Management Cost Guide | Atlia",
    description:
      "See the cost stack behind Airbnb property management, from management fees to cleaning, maintenance, supplies, taxes, and platform costs.",
    h1: "Airbnb property management cost guide",
    eyebrow: "Cost breakdown",
    lede:
      "The management fee is only one part of short-term rental economics. Owners should understand the full cost stack before choosing a manager.",
    primaryCta: "Estimate fee savings",
    sections: [
      {
        title: "The main cost categories",
        body:
          "<ul><li>Management fee: the percentage or flat fee paid to run the property.</li><li>Cleaning and turnovers: guest-ready resets between stays.</li><li>Maintenance and repairs: routine fixes and emergency issues.</li><li>Supplies and linens: consumables, replacements, and guest amenities.</li><li>Platform and payment fees: Airbnb, Vrbo, and processor costs.</li><li>Taxes, permits, and insurance: local and property-specific obligations.</li></ul>",
      },
      {
        title: "Why gross revenue can mislead owners",
        body:
          "<p>A manager can increase gross revenue while owner net income stays flat if fees and operating costs rise at the same time. Atlia's fee calculator starts with the part of the cost stack owners can compare directly: the management fee.</p>",
      },
      {
        title: "How to evaluate a proposal",
        body:
          "<p>Ask every manager for an owner-income example that separates gross revenue, management fees, cleaning, maintenance, platform fees, taxes, and owner payout. If those lines are bundled together, it is hard to know what you actually keep.</p>",
      },
    ],
    faqs: [
      {
        q: "Is the management fee the same as total cost?",
        a: "No. Total cost can include cleaning, repairs, supplies, platform fees, taxes, permits, insurance, and optional add-ons.",
      },
      {
        q: "What should owners optimize for?",
        a: "Optimize for net owner income and time saved, not gross revenue alone.",
      },
    ],
    sources: [sourceLinks.vacationRental],
  },
  {
    slug: "self-manage-airbnb-vs-property-manager",
    title: "Self-Manage Airbnb vs Property Manager | Atlia",
    description:
      "Compare self-managing an Airbnb with hiring a short-term rental property manager, including owner workload, guest experience, and fee tradeoffs.",
    h1: "Self-manage Airbnb vs. hire a property manager",
    eyebrow: "Owner decision guide",
    lede:
      "Self-management gives owners control. Property management gives owners leverage. The right answer depends on time, operating skill, distance from the property, and the value of consistent guest experience.",
    primaryCta: "Compare the fee math",
    sections: [
      {
        title: "When self-management works",
        body:
          "<p>Self-management can work when the owner lives nearby, has time for guest messages, can coordinate cleaners quickly, understands pricing, and wants direct control over every detail.</p>",
      },
      {
        title: "When a manager helps",
        body:
          "<p>A manager helps when bookings are frequent, guest issues interrupt work, cleaners need coordination, pricing needs attention, or the owner wants the property to operate without becoming their second job.</p>",
      },
      {
        title: "The Atlia model",
        body:
          "<p>Atlia is built for owners who want professional operations without traditional high-fee management. AI keeps the property context available, while experienced operators supervise important decisions and escalations.</p>",
      },
    ],
    faqs: [
      {
        q: "Is self-managing cheaper?",
        a: "Self-managing can reduce direct management fees, but it shifts guest communication, cleaner coordination, pricing, reporting, and issue handling back to the owner.",
      },
      {
        q: "What is the hidden cost of self-management?",
        a: "The hidden cost is usually owner time, missed pricing opportunities, slower guest response, and operational stress during nights, weekends, and travel.",
      },
    ],
    sources: [],
  },
  {
    slug: "airbnb-cohost-vs-property-manager",
    title: "Airbnb Co-Host vs Property Manager | Atlia",
    description:
      "Compare Airbnb co-hosts with full-service property managers and learn which option fits owners who want lower fees and less operating work.",
    h1: "Airbnb co-host vs. property manager",
    eyebrow: "Comparison guide",
    lede:
      "A co-host can help with pieces of hosting. A property manager is responsible for the operating system around the property. Owners should compare scope, accountability, and fee structure.",
    primaryCta: "See Atlia's 10% model",
    sections: [
      {
        title: "What co-hosts usually help with",
        body:
          "<p>Co-hosts can help with listing support, guest messaging, booking coordination, and other hosting tasks. Airbnb's Co-Host Network lets hosts work with co-hosts and use payout structures such as a percentage per booking, a fixed amount, or a cleaning-fee arrangement.</p>",
      },
      {
        title: "Where property management is different",
        body:
          "<p>Full-service property management usually covers the broader operating layer: guest experience, turnovers, vendor coordination, maintenance workflows, owner reporting, pricing oversight, and issue escalation.</p>",
      },
      {
        title: "How Atlia fits",
        body:
          "<p>Atlia combines the operating scope of a property manager with a 10% fee model. The property brain stores property-specific context so guest operations, rules, vendors, and owner preferences do not live in scattered notes.</p>",
      },
    ],
    faqs: [
      {
        q: "Is a co-host the same as a property manager?",
        a: "Not always. Some co-hosts provide broad support, while others handle only specific tasks. Owners should compare the scope of work in writing.",
      },
      {
        q: "Which is better for an out-of-town owner?",
        a: "Out-of-town owners usually need stronger coverage for vendors, cleaners, maintenance, and guest escalations. The right fit depends on the property and local support network.",
      },
    ],
    sources: [sourceLinks.airbnbCohost],
  },
  {
    slug: "short-term-rental-property-management",
    title: "Short-Term Rental Property Management | Atlia",
    description:
      "Learn what short-term rental property management includes and how Atlia runs guest communication, pricing, turnovers, maintenance coordination, and reporting.",
    h1: "Short-term rental property management",
    eyebrow: "Category guide",
    lede:
      "Short-term rental management is the operating work required to keep an Airbnb or Vrbo property booked, guest-ready, compliant, and financially visible to the owner.",
    primaryCta: "Talk to Atlia",
    sections: [
      {
        title: "What management includes",
        body:
          "<ul><li>Listing setup and channel coordination.</li><li>Guest communication before, during, and after stays.</li><li>Dynamic pricing checks and calendar management.</li><li>Cleaner scheduling and turnover quality control.</li><li>Maintenance coordination and vendor escalation.</li><li>Owner reporting and payout visibility.</li></ul>",
      },
      {
        title: "Why STR management is harder than long-term rental management",
        body:
          "<p>Short-term rentals turn over more often, guests expect fast replies, pricing changes with demand, and small operational issues can immediately affect reviews. That makes memory, process, and response speed especially important.</p>",
      },
      {
        title: "How Atlia manages properties",
        body:
          "<p>Atlia gives each property a persistent operating memory: house rules, parking instructions, local recommendations, cleaner notes, vendor preferences, pricing context, and owner reporting. Operators supervise the system so owners stay in control.</p>",
      },
    ],
    faqs: [
      {
        q: "Does short-term rental management include cleaning?",
        a: "Management usually includes coordinating turnovers, but cleaning costs and vendor payments can be separate. Owners should confirm exactly what is included.",
      },
      {
        q: "Does Atlia manage Airbnb and Vrbo?",
        a: "Atlia is built to manage short-term rentals across Airbnb, Vrbo, and similar booking platforms.",
      },
    ],
    sources: [sourceLinks.vacationRental],
  },
  {
    slug: "vacasa-alternatives",
    title: "Vacasa Alternatives for STR Owners | Atlia",
    description:
      "A practical guide for owners comparing Vacasa, local managers, co-hosts, self-management, and Atlia's 10% short-term rental management model.",
    h1: "Vacasa alternatives for short-term rental owners",
    eyebrow: "Alternatives guide",
    lede:
      "If you are comparing national vacation rental managers, local managers, co-hosts, self-management, and Atlia, focus on the owner outcome: net income, time saved, service quality, and transparency.",
    primaryCta: "Compare Atlia's model",
    sections: [
      {
        title: "The main alternatives to compare",
        body:
          "<ul><li>National vacation rental managers.</li><li>Local boutique STR managers.</li><li>Airbnb co-hosts.</li><li>Self-management with tools.</li><li>Atlia's AI plus operator management model.</li></ul>",
      },
      {
        title: "Questions to ask before switching",
        body:
          "<ul><li>What exact fee percentage or flat fee will I pay?</li><li>Which services are included and which are add-ons?</li><li>Who handles guest issues after hours?</li><li>How are cleaners, vendors, and maintenance tracked?</li><li>How often will I receive owner reporting?</li><li>What happens if performance drops or reviews decline?</li></ul>",
      },
      {
        title: "Where Atlia is different",
        body:
          "<p>Atlia charges a 10% management fee and uses a property brain to keep operating context in one place. The goal is lower owner fees without asking owners to become the operations team.</p>",
      },
    ],
    faqs: [
      {
        q: "What should I compare when looking at Vacasa alternatives?",
        a: "Compare fee structure, local coverage, guest response quality, cleaning coordination, maintenance process, owner reporting, contract terms, and net owner income.",
      },
      {
        q: "Is Atlia a software tool or a manager?",
        a: "Atlia is the property management company. Owners do not need to assemble a stack of tools to operate the property themselves.",
      },
    ],
    sources: [sourceLinks.vacasa, sourceLinks.vacationRental],
  },
];

const css = `
:root {
  color-scheme: light;
  --ink: #18211b;
  --muted: #5f6b62;
  --line: #dfe6df;
  --paper: #fbfcf8;
  --wash: #f0f5ef;
  --sage: #2f724c;
  --sage-dark: #24593b;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Lilex, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--ink);
  background: var(--paper);
  line-height: 1.55;
}

a {
  color: inherit;
}

.site-nav,
.hero,
.content,
.footer {
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
}

.site-nav {
  min-height: 86px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-weight: 700;
  font-size: 24px;
}

.brand img {
  width: 30px;
  height: 30px;
}

.nav-links {
  display: flex;
  gap: 20px;
  color: var(--muted);
  font-size: 15px;
}

.nav-links a {
  text-decoration: none;
}

.hero {
  padding: 76px 0 48px;
  border-top: 1px solid var(--line);
}

.eyebrow {
  color: #5f8269;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 700;
  font-size: 13px;
}

h1 {
  max-width: 880px;
  margin: 18px 0 22px;
  font-size: clamp(48px, 8vw, 92px);
  line-height: 0.95;
  font-weight: 500;
  letter-spacing: 0;
}

.lede {
  max-width: 760px;
  color: var(--muted);
  font-size: clamp(20px, 3vw, 28px);
  line-height: 1.35;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 999px;
  background: var(--sage);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.button.secondary {
  background: transparent;
  color: var(--sage-dark);
  border: 1px solid #a9beb0;
}

.content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 54px;
  padding: 28px 0 84px;
}

.main-card,
.side-card {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid var(--line);
  border-radius: 8px;
}

.main-card {
  padding: clamp(24px, 4vw, 44px);
}

.section + .section {
  border-top: 1px solid var(--line);
  margin-top: 36px;
  padding-top: 34px;
}

h2 {
  margin: 0 0 14px;
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.05;
  font-weight: 500;
}

h3 {
  margin: 26px 0 10px;
  font-size: 22px;
}

p {
  margin: 0 0 16px;
}

ul {
  padding-left: 22px;
}

li + li {
  margin-top: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 22px 0;
  font-size: 15px;
}

th,
td {
  border-bottom: 1px solid var(--line);
  text-align: left;
  padding: 12px 10px;
}

th {
  color: #3d5847;
  font-weight: 700;
}

.formula {
  margin: 18px 0;
  padding: 18px;
  border-radius: 8px;
  background: var(--wash);
  color: #274331;
  font-weight: 700;
}

.side-card {
  position: sticky;
  top: 22px;
  align-self: start;
  padding: 24px;
}

.side-card h2 {
  font-size: 24px;
}

.source-list {
  margin-top: 24px;
  color: var(--muted);
  font-size: 14px;
}

.faq-item {
  border-top: 1px solid var(--line);
  padding: 18px 0;
}

.faq-item strong {
  display: block;
  margin-bottom: 8px;
}

.footer {
  border-top: 1px solid var(--line);
  padding: 30px 0 42px;
  color: var(--muted);
  font-size: 14px;
}

@media (max-width: 820px) {
  .site-nav,
  .hero,
  .content,
  .footer {
    width: min(100% - 28px, 1120px);
  }

  .nav-links {
    display: none;
  }

  .hero {
    padding-top: 48px;
  }

  .content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .side-card {
    position: static;
  }

  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
`;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderSchema(page) {
  const canonical = `${siteUrl}/${page.slug}/`;
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Atlia",
      url: siteUrl,
      logo: `${siteUrl}/atlia_logo_v1.png`,
      email: "founders@atlia.com",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.h1,
          item: canonical,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      dateModified: lastmod,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ];

  if (page.slug === "airbnb-management-fee-calculator") {
    graph.push({
      "@type": "WebApplication",
      name: "Airbnb Management Fee Calculator",
      url: canonical,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function renderPage(page) {
  const canonical = `${siteUrl}/${page.slug}/`;
  const sources = page.sources.length
    ? `<div class="source-list"><strong>Sources and context</strong><ul>${page.sources
        .map(
          (source) =>
            `<li><a href="${source.url}">${escapeHtml(
              source.label,
            )}</a></li>`,
        )
        .join("")}</ul></div>`
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" type="image/png" href="/atlia_logo_v1.png" />
    <link rel="apple-touch-icon" href="/atlia_logo_v1.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Lilex:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/seo-pages.css" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:image" content="${siteUrl}/atlia_logo_v1.png" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <script type="application/ld+json">${renderSchema(page).replaceAll(
      "</",
      "<\\/",
    )}</script>
  </head>
  <body>
    <nav class="site-nav" aria-label="Main navigation">
      <a class="brand" href="/">
        <img src="/atlia_logo_v1.png" alt="" />
        <span>Atlia</span>
      </a>
      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/airbnb-management-fee-calculator/">Calculator</a>
        <a href="/short-term-rental-property-management/">Management</a>
      </div>
    </nav>

    <header class="hero">
      <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
      <h1>${escapeHtml(page.h1)}</h1>
      <p class="lede">${escapeHtml(page.lede)}</p>
      <div class="cta-row">
        <a class="button" href="/#signup">${escapeHtml(page.primaryCta)}</a>
        <a class="button secondary" href="/">Back to Atlia</a>
      </div>
    </header>

    <main class="content">
      <article class="main-card">
        ${page.sections
          .map(
            (section) =>
              `<section class="section"><h2>${escapeHtml(
                section.title,
              )}</h2>${section.body}</section>`,
          )
          .join("")}
        <section class="section" id="faq">
          <h2>Owner questions</h2>
          ${page.faqs
            .map(
              (faq) =>
                `<div class="faq-item"><strong>${escapeHtml(
                  faq.q,
                )}</strong><p>${escapeHtml(faq.a)}</p></div>`,
            )
            .join("")}
        </section>
        ${sources}
      </article>

      <aside class="side-card">
        <p class="eyebrow">Atlia model</p>
        <h2>10% STR management</h2>
        <p>Atlia manages Airbnb and Vrbo properties with AI plus experienced operators handling guests, pricing, turnovers, maintenance coordination, and owner reporting.</p>
        <a class="button" href="/#signup">Sign up</a>
      </aside>
    </main>

    <footer class="footer">
      <p>Copyright 2026 Atlia. Public information only. Property eligibility, rules, and economics vary by market and property.</p>
    </footer>
  </body>
</html>
`;
}

function renderSitemap() {
  const urls = [
    { loc: `${siteUrl}/`, priority: "1.0", changefreq: "weekly" },
    ...pages.map((page) => ({
      loc: `${siteUrl}/${page.slug}/`,
      priority:
        page.slug === "airbnb-management-fee-calculator" ? "0.9" : "0.8",
      changefreq: "monthly",
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
}

function renderLlms() {
  return `# Atlia

## What Atlia Is

Atlia is an AI-native property management company for short-term rentals. Atlia is the property management company, not a self-serve dashboard. Atlia combines software, a property-specific operating memory, and experienced operators to manage Airbnb, Vrbo, and similar short-term rental properties.

## Pricing

Atlia charges a 10% management fee for short-term rental property management.

Fee savings should be calculated as:

\`\`\`
annual booking revenue x (current manager fee percentage - 10%)
\`\`\`

Example: a property earning $60,000 per year saves $12,000 in annual management fees when moving from a 30% manager to Atlia's 10% fee. This is fee math only, not a guarantee of revenue, profit, occupancy, or regulatory eligibility.

## Who Atlia Is Built For

- Short-term rental owners who want end-to-end management for Airbnb, Vrbo, and similar platforms.
- Property owners comparing self-management, Airbnb co-hosts, local managers, national vacation rental managers, and lower-fee management options.
- Owners who want fewer repetitive operating tasks while keeping visibility and control.

## What Atlia Does

- Guest communication and guest coordination.
- Pricing checks and calendar context.
- Cleaner and turnover coordination.
- Maintenance coordination and vendor context.
- Owner reporting.
- Property-specific memory for house rules, parking, access, local recommendations, supplies, and owner preferences.

## Important Pages

- [Homepage](${siteUrl}/): Atlia overview and signup.
${pages
  .map(
    (page) =>
      `- [${page.h1}](${siteUrl}/${page.slug}/): ${page.description}`,
  )
  .join("\n")}

## Common Questions

- What is Atlia? Atlia is an AI-native short-term rental property management company.
- How is Atlia priced? Atlia charges a 10% management fee.
- Is Atlia a tool? No. Atlia is the property management company and runs operations with software plus operator oversight.
- Does Atlia guarantee profit? No. Property economics depend on booking revenue, occupancy, costs, maintenance, taxes, local rules, and property quality.

## Company

- Founded: 2026
- Backed by: Y Combinator
- Contact: founders@atlia.com
- Website: ${siteUrl}
`;
}

writeFileSync(join(publicDir, "seo-pages.css"), css.trimStart());
writeFileSync(join(publicDir, "sitemap.xml"), renderSitemap());
writeFileSync(join(publicDir, "llms.txt"), renderLlms());

for (const page of pages) {
  const outputPath = join(publicDir, page.slug, "index.html");
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, renderPage(page));
}

console.log(`Generated ${pages.length} SEO pages, sitemap.xml, and llms.txt`);
