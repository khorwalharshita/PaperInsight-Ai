import { useNavigate } from "react-router-dom";
import "./Analysis.css";

function Analysis() {
  const navigate = useNavigate();

  return (
    <div className="analysis-page">
      <div className="analysis-header">
        <div>
          <span className="analysis-eyebrow">AI POWERED RESEARCH</span>
          <h1>Research Analysis</h1>
          <p>Understand complex research papers with AI-generated insights.</p>
        </div>

        <button
          className="analysis-upload-btn"
          onClick={() => navigate("/upload")}
        >
          ＋ New Analysis
        </button>
      </div>

      <div className="analysis-overview">
        <div className="analysis-overview-card">
          <span className="overview-label">Papers Analyzed</span>
          <h2>18</h2>
          <p>Research papers processed</p>
        </div>

        <div className="analysis-overview-card">
          <span className="overview-label">Key Findings</span>
          <h2>126</h2>
          <p>Insights extracted by AI</p>
        </div>

        <div className="analysis-overview-card">
          <span className="overview-label">Topics Discovered</span>
          <h2>32</h2>
          <p>Across your research papers</p>
        </div>
      </div>

      <div className="analysis-content-grid">
        <section className="analysis-main-card">
          <div className="analysis-card-heading">
            <div>
              <h2>Latest Analysis</h2>
              <p>AI-generated summaries of your recent papers</p>
            </div>
            <span className="analysis-live-badge">● AI Insights</span>
          </div>

          <div className="analysis-paper">
            <div className="analysis-paper-icon">📄</div>
            <div className="analysis-paper-details">
              <h3>Attention Is All You Need</h3>
              <p>Vaswani et al. · Deep Learning</p>
              <span className="analysis-tag">Transformer Architecture</span>
            </div>
          </div>

          <div className="analysis-summary">
            <h3>Abstract Summary</h3>
            <p>
              This paper introduces the Transformer architecture, a neural network
              model based entirely on attention mechanisms. It eliminates recurrence
              and convolution, enabling greater parallelization and improved
              efficiency in sequence modeling tasks.
            </p>
          </div>

          <div className="analysis-findings">
            <h3>Key Findings</h3>

            <div className="finding-item">
              <span className="finding-number">01</span>
              <p>
                Attention mechanisms can replace recurrent networks for sequence
                transduction tasks.
              </p>
            </div>

            <div className="finding-item">
              <span className="finding-number">02</span>
              <p>
                The Transformer allows significantly more parallel training than
                traditional recurrent architectures.
              </p>
            </div>

            <div className="finding-item">
              <span className="finding-number">03</span>
              <p>
                Multi-head attention helps the model learn different relationships
                between tokens simultaneously.
              </p>
            </div>
          </div>
        </section>

        <div className="analysis-side-column">
          <section className="analysis-side-card">
            <h2>Methodology</h2>
            <p className="analysis-side-description">
              How the research approaches the problem
            </p>

            <div className="method-item">
              <span className="method-dot purple-dot"></span>
              <div>
                <h4>Multi-Head Attention</h4>
                <p>Parallel attention mechanisms</p>
              </div>
            </div>

            <div className="method-item">
              <span className="method-dot blue-dot"></span>
              <div>
                <h4>Positional Encoding</h4>
                <p>Token position information</p>
              </div>
            </div>

            <div className="method-item">
              <span className="method-dot green-dot"></span>
              <div>
                <h4>Encoder–Decoder</h4>
                <p>Sequence transformation framework</p>
              </div>
            </div>
          </section>

          <section className="analysis-side-card limitation-card">
            <h2>Limitations</h2>
            <p className="analysis-side-description">
              Potential considerations identified
            </p>

            <ul>
              <li>High computational requirements for large datasets</li>
              <li>Attention complexity grows with sequence length</li>
              <li>Requires substantial training data</li>
            </ul>
          </section>

          <section className="analysis-insight-card">
            <span className="insight-icon">✨</span>
            <h3>AI Insight</h3>
            <p>
              This research laid the foundation for many modern language models.
              Explore related papers to understand how the architecture evolved.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Analysis;