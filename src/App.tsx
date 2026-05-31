import "./App.css";
import BoidsBackground from "./components/BoidsBackground";
import Cursor from "./components/Cursor";
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
            <h1>
              Bringing AI-driven economies of scale to the small-medium
              businesses of America
            </h1>
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
                medium businesses radically more efficient, letting a team of 20
                operate like a team of 200. Alongside our software, we invest in
                ETA-style acquisitions, partnering with operators who share our
                belief that the right tools can unlock the full potential of
                businesses that constituteAmerica's backbone.
              </p>
            </section>
            <section className="who-section">
              <h3 className="who-heading">Who we are for</h3>
              <div className="who-list">
                <div className="who-item">
                  <p className="who-title">Small &amp; Medium Businesses</p>
                  <p className="who-desc">
                    You run a traditional business and want to automate the
                    manual, repetitive workflows eating up your team's time. Or
                    you want to expand into new operations without having the
                    budget to hire. We build the AI tools that let you do more
                    with the team you already have.
                  </p>
                  <a
                    href="https://calendar.app.google/gvebHmfw8xbJWJNb7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-btn"
                  >
                    Book a 30 min intro
                  </a>
                </div>
                <div className="who-item">
                  <p className="who-title">Search funds &amp; ETA funds</p>
                  <p className="who-desc">
                    You are acquiring or investing in a traditional business and
                    want it to improve IRR by 10-20%. We co-invest and build
                    domain-specific AI stacks to unlock significant operational
                    efficiency.
                  </p>
                  <a
                    href="https://calendar.app.google/gvebHmfw8xbJWJNb7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-btn"
                  >
                    Book a 30 min intro
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
              </a>
            </p>
            <div className="yc-badge">
              <img src={ycLogo} alt="Y Combinator" className="yc-logo" />
              <span>Backed by Y Combinator</span>
            </div>
          </div>
        </section>
      </div>
      <footer className="site-footer">
        <span>© 2026 Atlia</span>
        <span className="footer-sep">·</span>
        <a href="mailto:founders@atlia.com">founders@atlia.com</a>
      </footer>
    </>
  );
}

export default App;
