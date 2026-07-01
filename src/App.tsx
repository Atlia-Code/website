import { useEffect, useState } from "react";
import "./App.css";
import WaitlistModal from "./components/WaitlistModal";
import atliaLogo from "./assets/atlia_logo_v1.png";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Product", href: "#product" },
  { label: "Owners", href: "#owners" },
  { label: "FAQ", href: "#faq" },
];

const benefits = [
  {
    title: "Works in the background",
    text: "Atlia coordinates guest messages, pricing checks, turnovers, and routine owner updates without adding another dashboard to manage.",
    tone: "mint",
  },
  {
    title: "Owners stay in control",
    text: "Clear approvals, transparent reporting, and a flat 10% management fee keep the model simple from the first booking onward.",
    tone: "stone",
  },
  {
    title: "Knows your property",
    text: "The system keeps context on house rules, vendors, calendars, pricing, guests, and property-specific operating details.",
    tone: "dark",
  },
];

const faqs = [
  {
    question: "What is Atlia?",
    answer:
      "Atlia is an AI-native property management company for short-term rental owners. We combine software and operations to run bookings, guests, pricing, and day-to-day coordination.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Most properties can be reviewed and prepared within a few days once we have listing access, property details, calendar context, and operating preferences.",
  },
  {
    question: "Does the AI act without approval?",
    answer:
      "High-impact actions can be reviewed by the owner or operator. The goal is to remove repetitive work while keeping clear control over important decisions.",
  },
  {
    question: "Does Atlia replace my existing tools?",
    answer:
      "Atlia can work around the tools owners already use, then consolidate workflows where it improves speed, quality, and visibility.",
  },
  {
    question: "What kinds of properties are a fit?",
    answer:
      "We are focused on residential short-term rentals, especially owners who want professional operations without traditional 20-35% management fees.",
  },
  {
    question: "How is Atlia priced?",
    answer:
      "Atlia manages short-term rentals for a flat 10% fee, designed to be materially lower than traditional managers while keeping the owner experience professional.",
  },
];

function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(-1);

  const openWaitlist = () => setWaitlistOpen(true);

  useEffect(() => {
    const updateNav = () => setNavScrolled(window.scrollY > 120);
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => window.removeEventListener("scroll", updateNav);
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const target = window.location.hash;
      if (!target) return;
      const element = document.querySelector(target);
      element?.scrollIntoView({ block: "start" });
    };

    requestAnimationFrame(scrollToHash);
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div className="site-shell" id="top">
      <WaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />

      <nav
        className={`site-nav${navScrolled ? " site-nav--scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <button className="announcement-link" onClick={openWaitlist}>
          <span>Backed by Y Combinator</span>
          <span className="announcement-separator">·</span>
          <span>Join the early access list</span>
          <span className="announcement-arrow" aria-hidden="true">
            →
          </span>
        </button>

        <div className="nav-main">
          <div className="nav-links" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <a className="brand-link" href="#top" aria-label="Atlia home">
            <img className="brand-mark" src={atliaLogo} alt="" />
            <span className="brand-word">atlia</span>
          </a>

          <div className="nav-actions">
            <a className="nav-login" href="mailto:founders@atlia.com">
              Contact
            </a>
            <button
              className="demo-button demo-button--nav"
              onClick={openWaitlist}
            >
              <span>Book a demo</span>
              <span className="demo-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <img
            className="hero-media"
            src="/atlia-main-hero.png"
            alt="A mountain lake property viewed through a warm living room"
          />
          <div className="hero-vignette" aria-hidden="true" />

          <div className="hero-copy">
            <div className="yc-pill" aria-label="Backed by Y Combinator">
              <span className="yc-mark">Y</span>
              <span>Combinator</span>
            </div>
            <h1 id="hero-title">Intelligent property operations</h1>
            <p>
              AI-native management for short-term rentals. Atlia helps owners
              run bookings, guests, pricing, and operations with less overhead.
            </p>
            <button
              className="demo-button demo-button--hero"
              onClick={openWaitlist}
            >
              <span>Book a demo</span>
              <span className="demo-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </section>

        <section className="page-section product-section" id="product">
          <div className="section-grid section-grid--intro">
            <div>
              <p className="section-eyebrow">Product</p>
              <h2>An autonomous operating layer</h2>
            </div>
            <p className="section-lede">
              Atlia understands how your calendar, guests, cleaners, pricing,
              house rules, and owner goals connect so each property can run like
              a sharper, lower-fee operation.
            </p>
          </div>

          <div className="product-visual" aria-label="Atlia operations overview">
            <div className="visual-chrome">
              <span />
              <span />
              <span />
            </div>
            <div className="product-dashboard">
              <aside className="dashboard-sidebar">
                <span className="sidebar-logo">a</span>
                <span />
                <span />
                <span />
                <span />
              </aside>
              <div className="dashboard-main">
                <div className="dashboard-top">
                  <div>
                    <p>Portfolio health</p>
                    <strong>96%</strong>
                  </div>
                  <div>
                    <p>Owner margin</p>
                    <strong>+18%</strong>
                  </div>
                  <div>
                    <p>Open tasks</p>
                    <strong>12</strong>
                  </div>
                </div>
                <div className="dashboard-body">
                  <div className="ops-feed">
                    <div className="feed-row feed-row--active">
                      <span />
                      <div>
                        <strong>Guest arrival confirmed</strong>
                        <p>Message, lock code, and cleaner status synced.</p>
                      </div>
                    </div>
                    <div className="feed-row">
                      <span />
                      <div>
                        <strong>Weekend pricing adjusted</strong>
                        <p>Demand spike detected near the property.</p>
                      </div>
                    </div>
                    <div className="feed-row">
                      <span />
                      <div>
                        <strong>Owner report prepared</strong>
                        <p>Revenue, fees, and upcoming tasks summarized.</p>
                      </div>
                    </div>
                  </div>
                  <div className="ops-panel">
                    <div className="panel-chart" />
                    <div className="panel-list">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-detail">
                <p>Recommended action</p>
                <h3>Approve smart minimum-stay change</h3>
                <span>Projected uplift: $420 this week</span>
                <button onClick={openWaitlist}>Review</button>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section benefits-section" id="owners">
          <div className="section-grid section-grid--benefits">
            <div>
              <p className="section-eyebrow">Benefits</p>
              <h2>Why owners choose Atlia</h2>
            </div>
            <p className="section-lede">
              Less administration, lower management fees, and better guest
              operations without asking owners to become property managers.
            </p>
            <button className="demo-button demo-button--light" onClick={openWaitlist}>
              <span>Book a demo</span>
              <span className="demo-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>

          <div className="benefit-cards">
            {benefits.map((benefit, index) => (
              <article className="benefit-card" key={benefit.title}>
                <div className={`benefit-visual benefit-visual--${benefit.tone}`}>
                  <div className="benefit-window benefit-window--left">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="benefit-window benefit-window--right">
                    <strong>atlia</strong>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="benefit-orb">{index + 1}</div>
                </div>
                <div className="benefit-copy">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section faq-section" id="faq">
          <div className="section-grid section-grid--faq">
            <div>
              <p className="section-eyebrow">FAQ</p>
              <h2>Frequently asked questions</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => {
                const expanded = activeFaq === index;
                return (
                  <div
                    className={`faq-item${expanded ? " faq-item--open" : ""}`}
                    key={faq.question}
                  >
                    <button
                      className="faq-question"
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setActiveFaq(expanded ? -1 : index)}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-plus" aria-hidden="true" />
                    </button>
                    <div className="faq-answer" aria-hidden={!expanded}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <img
            className="closing-media"
            src="/atlia-closing-hotel.png"
            alt="A managed hospitality property at night"
          />
          <div className="closing-overlay" aria-hidden="true" />
          <div className="closing-copy">
            <h2 id="closing-title">
              Helping property owners do their best work.
            </h2>
            <p>
              Great hospitality should not require a dozen tools, constant
              coordination, or traditional management fees.
            </p>
            <button className="demo-button demo-button--hero" onClick={openWaitlist}>
              <span>Book a demo</span>
              <span className="demo-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <a className="footer-logo" href="#top" aria-label="Atlia home">
            <img src={atliaLogo} alt="" />
            <span>atlia</span>
          </a>
          <p>
            The AI-native operating system for short-term rental owners.
            Professional management at a simpler 10% fee.
          </p>
          <a href="https://www.linkedin.com/company/atlia">LinkedIn</a>
        </div>
        <div className="footer-column">
          <h3>Product</h3>
          <a href="#top">Home</a>
          <a href="#product">Product</a>
          <a href="#owners">Owners</a>
        </div>
        <div className="footer-column">
          <h3>Company</h3>
          <a href="mailto:founders@atlia.com">Contact</a>
          <button type="button" onClick={openWaitlist}>
            Book a demo
          </button>
        </div>
        <p className="footer-legal">©2026 Atlia. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
