import { useState } from "react";
import "./App.css";
import BoidsBackground from "./components/BoidsBackground";
import Cursor from "./components/Cursor";
import LogoMarquee from "./components/LogoMarquee";
import WaitlistModal from "./components/WaitlistModal";
import atliaLogo from "./assets/atlia_logo_v1.png";
import ycLogo from "/Y_Combinator_logo.svg.png";

function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <Cursor />
      <BoidsBackground />
      <button className="waitlist-cta" onClick={() => setWaitlistOpen(true)}>
        Join the waitlist
      </button>
      <WaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />
      <div className="container">
        {/* Hero Section */}
        <section className="section">
          <div className="content">
            <img src={atliaLogo} alt="Atlia logo" className="hero-logo" />
            <h2 className="brand-name">Atlia</h2>
            <h1>The first AI-native property management company</h1>
            <a
              href="https://www.ycombinator.com"
              target="_blank"
              rel="noopener noreferrer"
              className="yc-badge"
            >
              <img src={ycLogo} alt="Y Combinator" className="yc-logo" />
              <span>Backed by Y Combinator</span>
            </a>
            <section className="what-section">
              <h3 className="who-heading">The Problem</h3>
              <p className="what-desc">
                Traditional short-term property managers charge{" "}
                <strong>20&ndash;35%</strong> of total booking revenue &mdash;
                costing landlords thousands of dollars every year. They use 5-8
                different softwares tools that don't communicate well with each
                other, resulting in worse guest experiences.
              </p>
            </section>
            <section className="what-section">
              <h3 className="who-heading">The Solution</h3>
              <p className="what-desc">
                A unified, end-to-end platform streamlining operations &mdash;
                handling bookings, guests, pricing, and operations across
                Airbnb, Vrbo, and beyond. We take over the full operation of
                your short-term rental for a flat <strong>10% fee</strong>, less
                than half what traditional managers charge.
              </p>
              {/* <div className="fee-compare">
                <div className="fee-item fee-old">
                  <span className="fee-num">20–35%</span>
                  <span className="fee-label">Traditional managers</span>
                </div>
                <div className="fee-arrow">→</div>
                <div className="fee-item fee-new">
                  <span className="fee-num">10%</span>
                  <span className="fee-label">Atlia</span>
                </div>
              </div> */}
            </section>
            <section className="what-section">
              <h3 className="who-heading">Why Us</h3>
              <p className="what-desc">
                We&rsquo;ve spent the past year managing short-term rental
                properties ourselves &mdash; coordinating guests, optimizing
                pricing, and delivering the kind of five-star experiences that
                keep bookings full. We built Atlia because we know what it
                takes, and we know it can be done better.
              </p>
            </section>
            <LogoMarquee />
            <section className="who-section">
              <h3 className="who-heading">Who we are for</h3>
              <div className="who-list">
                <div className="who-item">
                  <p className="who-title">Property owners</p>
                  <p className="who-desc">
                    If you rent out a residential property, we'd love to save
                    you money. We take over the full operation of your
                    short-term rental for a 10% fee. Most long-term rentals can
                    also be converted into more profitable short-term rentals
                    under our model &mdash; so if you own one, let's talk.
                  </p>
                  <button
                    className="book-btn"
                    onClick={() => setWaitlistOpen(true)}
                  >
                    Join the waitlist
                  </button>
                </div>
              </div>
            </section>
            <section className="what-section">
              <h3 className="who-heading">Where we're going</h3>
              <p className="what-desc">
                Our vision is to bring traditionally inanimate businesses to
                life. A property that manages itself. A factory that optimizes
                its own operations. We see a future where every business is
                given a brain to operate on its own behalf &mdash; and we're
                starting with a field we know and understand well.
              </p>
            </section>
            <p className="contact-line">
              Reach out at{" "}
              <a href="mailto:founders@atlia.com">founders@atlia.com</a>
              <span className="contact-sep">|</span>
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
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
