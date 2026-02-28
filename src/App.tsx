import "./App.css";
import BoidsBackground from "./components/BoidsBackground";
import Cursor from "./components/Cursor";
import atliaLogo from "./assets/atlia_logo_v1.png";

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
              Building the next generation of AI-driven private portfolio
              management
            </h1>
            <h2>
              We work with operator style funds in the private markets
              <br />
              to provide financial analytics into traditionally black box
              investments.
            </h2>
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
              <svg
                className="yc-logo"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="4" fill="#F26522" />
                <path
                  d="M11.5 9L20 23.5L28.5 9H24.5L20 17.5L15.5 9H11.5Z"
                  fill="white"
                />
                <line
                  x1="20"
                  y1="23.5"
                  x2="20"
                  y2="32"
                  stroke="white"
                  strokeWidth="3.5"
                />
              </svg>
              <span>Backed by Y Combinator</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
