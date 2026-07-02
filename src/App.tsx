import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import "./App.css";
import WaitlistModal from "./components/WaitlistModal";
import atliaLogo from "./assets/atlia_logo_v1.png";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Product", href: "#product" },
  { label: "Owners", href: "#owners" },
  { label: "FAQ", href: "#faq" },
];

type GraphNode = {
  id: string;
  label: string;
  category: string;
  detail: string;
  x: number;
  y: number;
  size: number;
  tone: "center" | "sage" | "terracotta" | "charcoal" | "smoke";
};

const graphNodes: GraphNode[] = [
  {
    id: "property",
    label: "Property Brain",
    category: "Core memory",
    detail:
      "Complete understanding of your property and continuously improving guest operations.",
    x: 52,
    y: 52,
    size: 104,
    tone: "center",
  },
  {
    id: "guest-experience",
    label: "Guest Experience",
    category: "Guest operations",
    detail:
      "Atlia manages all guest coordination (issue handling, check-in, and property questions), matching your tone and ensuring a 5-star experience for every guest.",
    x: 30,
    y: 24,
    size: 74,
    tone: "sage",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    category: "Property care",
    detail:
      "Plumbing, HVAC, appliance notes, vendor preferences, and escalation rules are kept in context before problems become owner work.",
    x: 22,
    y: 60,
    size: 70,
    tone: "terracotta",
  },
  {
    id: "recommendations",
    label: "Local Recommendations",
    category: "Local context",
    detail:
      "Restaurants, beaches, activities, parking tips, and owner-approved suggestions are available for guest messages.",
    x: 68,
    y: 22,
    size: 76,
    tone: "smoke",
  },
  {
    id: "pricing",
    label: "Pricing",
    category: "Revenue",
    detail:
      "Calendar demand, minimum stays, seasonal changes, and local events inform pricing decisions before they are surfaced.",
    x: 78,
    y: 50,
    size: 66,
    tone: "terracotta",
  },
  {
    id: "turnovers",
    label: "Turnovers",
    category: "Clean operations",
    detail:
      "Cleaning checklists, supply levels, inspection notes, and arrival timing stay coordinated between bookings.",
    x: 58,
    y: 80,
    size: 68,
    tone: "sage",
  },
  {
    id: "owner-reporting",
    label: "Owner Reporting",
    category: "Owner visibility",
    detail:
      "Revenue, fees, maintenance status, and property health are summarized without extra dashboards.",
    x: 34,
    y: 80,
    size: 68,
    tone: "charcoal",
  },
  {
    id: "house-rules",
    label: "House Rules",
    category: "Operating rules",
    detail:
      "Parking, pets, noise, trash, access instructions, and property-specific boundaries are applied consistently.",
    x: 72,
    y: 72,
    size: 64,
    tone: "sage",
  },
];

const graphNodeById = graphNodes.reduce<Record<string, GraphNode>>(
  (lookup, node) => {
    lookup[node.id] = node;
    return lookup;
  },
  {},
);

const graphLinks = [
  ["property", "guest-experience"],
  ["property", "maintenance"],
  ["property", "recommendations"],
  ["property", "pricing"],
  ["property", "turnovers"],
  ["property", "owner-reporting"],
  ["property", "house-rules"],
  ["guest-experience", "recommendations"],
  ["guest-experience", "house-rules"],
  ["maintenance", "turnovers"],
  ["pricing", "owner-reporting"],
  ["turnovers", "owner-reporting"],
  ["house-rules", "recommendations"],
] as const;

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

type LoginPageProps = {
  onBack: () => void;
};

function LoginPage({ onBack }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("Wrong email or password.");
  };

  return (
    <section className="login-page" id="login" aria-labelledby="login-title">
      <div className="login-shell">
        <div className="login-copy">
          <p className="section-eyebrow">Login</p>
          <h1 id="login-title">Atlia owner portal</h1>
          {/* <p>
            Account access is not available yet. Sign up to be notified when the
            portal opens.
          </p> */}
          <button className="login-back" type="button" onClick={onBack}>
            Back to site
          </button>
        </div>

        <form className="login-card" onSubmit={handleSubmit} noValidate>
          <h2>Sign in</h2>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error && <p className="login-error">{error}</p>}
          <button className="login-submit" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(-1);
  const [activeGraphNodeId, setActiveGraphNodeId] = useState("property");
  const [loginPageOpen, setLoginPageOpen] = useState(false);
  const waitlistPromptShownRef = useRef(false);

  const openWaitlist = () => {
    waitlistPromptShownRef.current = true;
    setWaitlistOpen(true);
  };
  const showSite = () => {
    setLoginPageOpen(false);
    requestAnimationFrame(() => {
      document.querySelector("#top")?.scrollIntoView({ block: "start" });
    });
  };
  const openLoginPage = () => {
    setWaitlistOpen(false);
    setLoginPageOpen(true);
    window.history.pushState(null, "", "#login");
    requestAnimationFrame(() =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  };
  const activeGraphNode =
    graphNodeById[activeGraphNodeId] ?? graphNodeById.property;

  useEffect(() => {
    const updateNav = () => setNavScrolled(window.scrollY > 120);
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => window.removeEventListener("scroll", updateNav);
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const target = window.location.hash;
      if (target === "#login") {
        setLoginPageOpen(true);
        requestAnimationFrame(() => window.scrollTo({ top: 0 }));
        return;
      }
      if (!target) return;
      setLoginPageOpen(false);
      const element = document.querySelector(target);
      element?.scrollIntoView({ block: "start" });
    };

    requestAnimationFrame(scrollToHash);
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  useEffect(() => {
    if (loginPageOpen) return;

    const faqSection = document.querySelector("#faq");
    if (!faqSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (waitlistPromptShownRef.current) {
          observer.disconnect();
          return;
        }

        waitlistPromptShownRef.current = true;
        setWaitlistOpen(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.15,
      },
    );

    observer.observe(faqSection);
    return () => observer.disconnect();
  }, [loginPageOpen]);

  return (
    <div className="site-shell" id="top">
      <WaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />

      <nav
        className={`site-nav${
          navScrolled || loginPageOpen ? " site-nav--scrolled" : ""
        }`}
        aria-label="Main navigation"
      >
        <div className="nav-main">
          <div className="nav-links" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setLoginPageOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            className="brand-link"
            href="#top"
            aria-label="Atlia home"
            onClick={() => setLoginPageOpen(false)}
          >
            <img className="brand-mark" src={atliaLogo} alt="" />
            <span className="brand-word">Atlia</span>
          </a>

          <div className="nav-actions">
            <button className="nav-login" type="button" onClick={openLoginPage}>
              Login
            </button>
            <button
              className="demo-button demo-button--nav"
              onClick={openWaitlist}
            >
              <span>Sign up</span>
              <span className="demo-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main>
        {loginPageOpen ? (
          <LoginPage onBack={showSite} />
        ) : (
          <>
            <section className="hero-section" aria-labelledby="hero-title">
              <video
                className="hero-media"
                poster="/atlia-main-hero.png"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
              >
                <source src="/atlia-hero-loop.mp4" type="video/mp4" />
              </video>
              <div className="hero-vignette" aria-hidden="true" />

              <div className="hero-copy">
                <h1 id="hero-title">Premium Short-Term Property Management</h1>
                <div className="hero-support">
                  <p>
                    We manage your short term rentals for 10% - the lowest price
                    in the industry. And, we do it very well.
                  </p>
                  <a
                    className="yc-link"
                    href="https://www.ycombinator.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Backed by Y Combinator
                  </a>
                </div>
              </div>
            </section>

            <section className="page-section product-section" id="product">
              <div className="section-grid section-grid--intro">
                <div>
                  <p className="section-eyebrow">Operating model</p>
                  <h2>Atlia is your property manager</h2>
                </div>
                <p className="section-lede">
                  Atlia is AI-driven, but always monitored and trained by real
                  property managers. It has complete understanding of your
                  property, enabling your property to manage itself. Atlia
                  handles everything - guests, cleaners, maintenance, pricing,
                  owner reporting, and day-to-day decisions with experienced
                  operators supervising the system.
                </p>
              </div>

              <div
                className="product-visual"
                aria-label="Atlia property knowledge graph"
              >
                <div className="knowledge-graph">
                  <div className="graph-canvas">
                    <svg
                      className="graph-links"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      {graphLinks.map(([fromId, toId]) => {
                        const fromNode = graphNodeById[fromId];
                        const toNode = graphNodeById[toId];
                        const isActive =
                          activeGraphNodeId === fromId ||
                          activeGraphNodeId === toId;

                        return (
                          <line
                            key={`${fromId}-${toId}`}
                            className={`graph-link${isActive ? " graph-link--active" : ""}`}
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                          />
                        );
                      })}
                    </svg>

                    {graphNodes.map((node) => {
                      const isActive = activeGraphNodeId === node.id;

                      return (
                        <button
                          key={node.id}
                          className={`graph-node graph-node--${node.tone}${
                            isActive ? " graph-node--active" : ""
                          }`}
                          style={
                            {
                              "--node-size": `${node.size}px`,
                              left: `${node.x}%`,
                              top: `${node.y}%`,
                            } as CSSProperties
                          }
                          type="button"
                          aria-label={node.label}
                          aria-describedby="graph-info"
                          aria-pressed={isActive}
                          onClick={() => setActiveGraphNodeId(node.id)}
                          onFocus={() => setActiveGraphNodeId(node.id)}
                          onMouseEnter={() => setActiveGraphNodeId(node.id)}
                        />
                      );
                    })}
                  </div>

                  <div
                    className="graph-info"
                    id="graph-info"
                    aria-live="polite"
                  >
                    <p>{activeGraphNode.category}</p>
                    <h3>{activeGraphNode.label}</h3>
                    <span>{activeGraphNode.detail}</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="page-section benefits-section" id="owners">
              <div className="section-grid section-grid--benefits">
                <div>
                  <p className="section-eyebrow">Owner outcomes</p>
                  <h2>Who Atlia is for</h2>
                </div>
                <p className="section-lede">
                  Atlia is for property owners who want lower management fees
                  and better guest operations without needing to become property
                  managers themselves.
                </p>
                <button
                  className="demo-button demo-button--light"
                  onClick={openWaitlist}
                >
                  <span>Sign up</span>
                  <span className="demo-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>

              <div className="benefit-cards">
                {benefits.map((benefit, index) => (
                  <article className="benefit-card" key={benefit.title}>
                    <div
                      className={`benefit-visual benefit-visual--${benefit.tone}`}
                    >
                      <div className="benefit-window benefit-window--left">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="benefit-window benefit-window--right">
                        <strong>Atlia</strong>
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
                  <p className="section-eyebrow">Questions</p>
                  <h2>Common things owners ask us</h2>
                  <p className="faq-intro"></p>
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
                          <span className="faq-chevron" aria-hidden="true">
                            ›
                          </span>
                          <span>{faq.question}</span>
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

            <section
              className="closing-section"
              aria-labelledby="closing-title"
            >
              <img
                className="closing-media"
                src="/atlia-closing-hotel.png"
                alt="A managed hospitality property at night"
              />
              <div className="closing-overlay" aria-hidden="true" />
              <div className="closing-copy">
                <h2 id="closing-title">
                  Professional STR management, rebuilt around owners.
                </h2>
                <p>
                  Great hospitality should not require a dozen tools, constant
                  coordination, or traditional management fees.
                </p>
                <button
                  className="demo-button demo-button--hero"
                  onClick={openWaitlist}
                >
                  <span>Sign up</span>
                  <span className="demo-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a
              className="footer-logo"
              href="#top"
              aria-label="Atlia home"
              onClick={() => setLoginPageOpen(false)}
            >
              <img src={atliaLogo} alt="" />
              <span>Atlia</span>
            </a>
            <p>
              The AI-native property management company for short-term rental
              owners.
            </p>
          </div>

          <div className="footer-column">
            <h3>Product</h3>
            <a href="#product" onClick={() => setLoginPageOpen(false)}>
              Property intelligence
            </a>
            <a href="#owners" onClick={() => setLoginPageOpen(false)}>
              Owner benefits
            </a>
            <a href="#faq" onClick={() => setLoginPageOpen(false)}>
              FAQ
            </a>
          </div>

          <div className="footer-column">
            <h3>Owners</h3>
            <button type="button" onClick={openWaitlist}>
              Sign up
            </button>
            <a href="#top" onClick={() => setLoginPageOpen(false)}>
              Pricing
            </a>
            <a href="#owners" onClick={() => setLoginPageOpen(false)}>
              Management
            </a>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <button type="button" onClick={openLoginPage}>
              Login
            </button>
            <a href="https://www.linkedin.com/company/atlia">LinkedIn</a>
            <a
              href="https://www.ycombinator.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Y Combinator
            </a>
          </div>
        </div>
        <div className="footer-legal">
          <span>© 2026 Atlia. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
