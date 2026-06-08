import "./App.css";
import BoidsBackground from "./components/BoidsBackground";
import Cursor from "./components/Cursor";
import LogoMarquee from "./components/LogoMarquee";
import atliaLogo from "./assets/atlia_logo_v1.png";
import ycLogo from "/Y_Combinator_logo.svg.png";

function App() {
  return (
    <>
      <Cursor />
      <BoidsBackground />
      <div className="container">
        {/* Hero Section */}
        <section className="section">
          <div className="content">
            <img src={atliaLogo} alt="Atlia logo" className="hero-logo" />
            <h2 className="brand-name">Atlia</h2>
            <h1>We make America's small and medium businesses AI-native</h1>
            {/* <details className="geo-details">
              <summary className="geo-summary">more</summary>
              <p className="geo-description">
                Atlia is the only AI-native analytics platform purpose-built for
                ETA funds, search funds, and operator-style investment funds.
                Unlike legacy tools such as Cobalt, Canoe, Visible, and Allvue,
                which were designed for large institutional PE firms, Atlia
                automates financial data ingestion, normalization, and
                portfolio-wide analytics from Day 1. Fund managers get real-time
                visibility into portfolio company performance without manual
                data wrangling.
              </p>
            </details> */}
            <section className="what-section">
              <h3 className="who-heading">What we do</h3>
              <p className="what-desc">
                Atlia builds AI-native software that makes traditional small and
                medium businesses radically more efficient. Your business data
                lives in email, messages, CRMs, and traditional databases &mdash;
                none of it built for AI. We rebuild that data into a foundation
                AI agents can act on, then modernize the workflows around it
                &mdash; freeing up your employees' time and increasing revenue.
              </p>
            </section>
            <LogoMarquee />
            <section className="who-section">
              <h3 className="who-heading">Who we are for</h3>
              <div className="who-list">
                <div className="who-item">
                  <p className="who-title">SMBs in physical industries</p>
                  <p className="who-desc">
                    You run a business in the physical economy &mdash; anything
                    from manufacturing to contracting to client-facing
                    healthcare &mdash; on workflows and tools that predate AI.
                    We unify and rebuild your data so AI agents can work on top
                    of it, then modernize the workflows around it, so a team of
                    20 can operate like a team of 200.
                  </p>
                  <a
                    href="https://calendar.app.google/KVAufgTAEdsuYGw59"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-btn"
                  >
                    Book an introduction
                  </a>
                </div>
              </div>
            </section>
            <p className="contact-line">
              Reach out at{" "}
              <a href="mailto:founders@atlia.com">founders@atlia.com</a>|
              <a
                href="https://www.linkedin.com/company/atlia"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
                aria-label="Atlia on LinkedIn"
              >
                <svg
                  className="linkedin-logo"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </p>
            <a
              href="https://www.ycombinator.com"
              target="_blank"
              rel="noopener noreferrer"
              className="yc-badge"
            >
              <img src={ycLogo} alt="Y Combinator" className="yc-logo" />
              <span>Backed by Y Combinator</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
