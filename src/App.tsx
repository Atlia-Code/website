import "./App.css";
import BoidsBackground from "./components/BoidsBackground";

function App() {
  return (
    <>
      <BoidsBackground />
      <div className="container">
        {/* Hero Section */}
        <section className="section">
          <div className="content">
            <h1>Atlia</h1>
            <p>Reach out at founders@atlia.com</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
