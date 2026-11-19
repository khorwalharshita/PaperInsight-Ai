import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-tag">AI-Powered Research Assistant</p>

        <h1>
          Understand Research Papers
          <br />
          Smarter & Faster.
        </h1>

        <p className="hero-description">
          PaperInsight AI helps you analyze research papers,
          discover key insights, and understand complex
          academic content with ease.
        </p>

        <div className="hero-buttons">
          <Link to="/upload" className="primary-button">
            Analyze a Paper
          </Link>

          <a href="#how-it-works" className="secondary-button">
            How It Works
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;