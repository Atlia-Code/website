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
            <h1>Atlia</h1>
            <p>Building the next generation of private portfolio management</p>
            <p>
              {" "}
              Reach out at{" "}
              <a href="mailto:founders@atlia.com">founders@atlia.com</a>
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
