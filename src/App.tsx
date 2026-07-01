import { useEffect, useState } from "react";
import "./App.css";
import LogoMarquee from "./components/LogoMarquee";
import WaitlistModal from "./components/WaitlistModal";
import atliaLogo from "./assets/atlia_logo_v1.png";

const benefits = [
  {
    title: "Higher net income",
    copy:
      "Atlia runs the full short-term rental operation for a flat 10% fee, keeping more of each booking in the owner's pocket.",
  },
  {
    title: "Operations that stay moving",
    copy:
      "Guest messages, cleanings, pricing, listings, and issue resolution are coordinated through one operating layer.",
  },
  {
    title: "Owners stay in control",
    copy:
      "You get transparent reporting and decision points without being pulled into the day-to-day work.",
  },
];

const faqs = [
  {
    question: "What does Atlia do?",
    answer:
      "Atlia manages short-term rental properties end to end: booking channels, guest communication, pricing, vendor coordination, and operating workflows.",
  },
  {
    question: "Who is it for?",
    answer:
      "Property owners who want professional STR management with a lower fee structure, plus long-term rental owners exploring whether short-term rental conversion makes sense.",
  },
  {
    question: "How is Atlia priced?",
    answer:
      "Atlia charges a flat 10% management fee, compared with the 20-35% commonly charged by traditional short-term rental managers.",
  },
  {
    question: "Where is Atlia starting?",
    answer:
      "We are starting with short-term rentals in markets where strong operations can materially improve owner net income and guest experience.",
  },
];

function useSmoothPageScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let frame = 0;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const stop = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const animate = () => {
      currentY += (targetY - currentY) * 0.15;

      if (Math.abs(targetY - currentY) < 0.5) {
        window.scrollTo(0, targetY);
        stop();
        return;
      }

      window.scrollTo(0, currentY);
      frame = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!frame) {
        currentY = window.scrollY;
        frame = window.requestAnimationFrame(animate);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey) return;
      const path = event.composedPath();
      const insideNativeScroll = path.some((node) => {
        if (!(node instanceof HTMLElement)) return false;
        return Boolean(
          node.closest(
            ".waitlist-modal, input, select, textarea, [data-native-scroll]",
          ),
        );
      });

      if (insideNativeScroll) return;

      event.preventDefault();
      targetY = Math.min(maxScroll(), Math.max(0, targetY + event.deltaY));
      start();
    };

    const onScroll = () => {
      if (!frame) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);
}

function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useSmoothPageScroll(!waitlistOpen);

  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <>
      <WaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />

      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Atlia home">
          <img src={atliaLogo} alt="" />
          <span>Atlia</span>
        </a>
        <nav className="header-nav" aria-label="Primary navigation">
          <a href="#product">Product</a>
          <a href="#benefits">Benefits</a>
          <a href="#faq">FAQ</a>
          <a href="mailto:founders@atlia.com">Contact</a>
        </nav>
        <button className="nav-cta" onClick={openWaitlist}>
          Join waitlist
        </button>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-bg hero-bg-one" />
          <div className="hero-bg hero-bg-two" />
          <div className="hero-bg hero-bg-three" />
          <div className="hero-copy">
            <p className="eyebrow">AI-native property management</p>
            <h1 id="hero-title">The property manager that runs itself.</h1>
            <p>
              Atlia manages short-term rentals end to end so owners earn more
              net income without living inside booking portals, spreadsheets,
              and guest threads.
            </p>
            <button className="primary-cta" onClick={openWaitlist}>
              Join the waitlist
            </button>
          </div>
        </section>

        <section className="intro-band" id="product">
          <div className="section-kicker">Product</div>
          <div className="intro-grid">
            <h2>An autonomous operating system for rental properties.</h2>
            <p>
              Traditional managers stitch together channel managers, cleaners,
              pricing tools, guest messaging, and owner reporting. Atlia turns
              that fragmented workflow into one coordinated operation.
            </p>
          </div>
          <div className="product-scene" aria-label="Atlia operating model">
            <div className="property-card image-card">
              <span>Listing health</span>
              <strong>Booked 24 nights</strong>
              <small>Pricing, reviews, and guest flow monitored daily.</small>
            </div>
            <div className="property-card dark-card">
              <span>Owner economics</span>
              <strong>10% management</strong>
              <small>Lower fees, clear reporting, fewer moving parts.</small>
            </div>
            <div className="property-card light-card">
              <span>Operations queue</span>
              <strong>Cleanings, guests, vendors</strong>
              <small>Routine work coordinated before it becomes owner work.</small>
            </div>
          </div>
        </section>

        <section className="benefits-section" id="benefits">
          <div className="benefits-copy">
            <div className="section-kicker">Benefits</div>
            <h2>Built for owners who want performance without operational drag.</h2>
            <p>
              Less administration, better guest experience, and a lower
              management fee. Atlia handles the repetition while owners keep the
              visibility that matters.
            </p>
            <button className="secondary-cta" onClick={openWaitlist}>
              Get early access
            </button>
          </div>
          <div className="benefit-list">
            {benefits.map((benefit) => (
              <article className="benefit-item" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <LogoMarquee />

        <section className="split-section">
          <div className="split-image" />
          <div className="split-copy">
            <div className="section-kicker">Why now</div>
            <h2>Short-term rental management should feel calm from the owner's side.</h2>
            <p>
              Owners should not pay premium fees for fragmented software and
              manual coordination. Atlia combines operating experience with
              modern AI systems so properties can be managed with more precision
              and less overhead.
            </p>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="section-kicker">FAQ</div>
          <h2>Frequently asked questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="closing-cta">
          <h2>Let your property work with a better operating model.</h2>
          <p>
            Join the waitlist and tell us about the properties you want Atlia to
            manage.
          </p>
          <button className="primary-cta" onClick={openWaitlist}>
            Join the waitlist
          </button>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <img src={atliaLogo} alt="" />
          <span>Atlia</span>
        </div>
        <p>The AI-native property management company.</p>
        <nav aria-label="Footer navigation">
          <a href="mailto:founders@atlia.com">founders@atlia.com</a>
          <a
            href="https://www.linkedin.com/company/atlia"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </footer>
    </>
  );
}

export default App;
