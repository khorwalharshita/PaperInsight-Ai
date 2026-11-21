
import { useState } from "react";
import "./Compare.css";

const papers = [
  "Attention Is All You Need",
  "BERT: Pre-training of Deep Bidirectional Transformers",
  "A Survey on Large Language Models",
  "Deep Residual Learning for Image Recognition",
  "Generative Adversarial Networks",
  "An Image is Worth 16x16 Words",
];

const comparisonData = {
  "Attention Is All You Need": {
    authors: "Vaswani et al. (2017)",
    objective: "Improve sequence transduction without recurrence or convolution.",
    methodology: "Transformer architecture using self-attention and multi-head attention.",
    technologies: "Transformers, Self-Attention, Positional Encoding",
    findings: "Achieved state-of-the-art translation results with improved parallelization.",
    limitations: "Attention computation becomes expensive as sequence length increases.",
  },
  "BERT: Pre-training of Deep Bidirectional Transformers": {
    authors: "Devlin et al. (2018)",
    objective: "Learn deep bidirectional language representations for NLP tasks.",
    methodology: "Masked Language Modeling and Next Sentence Prediction.",
    technologies: "Bidirectional Transformer, MLM, NSP",
    findings: "Strong performance across a range of NLP benchmarks.",
    limitations: "Pre-training is resource intensive and fine-tuning requires task-specific data.",
  },
  "A Survey on Large Language Models": {
    authors: "Zhao et al. (2023)",
    objective: "Survey the development, capabilities, and challenges of large language models.",
    methodology: "Literature review and taxonomy of LLM architectures, training, and applications.",
    technologies: "LLMs, Transformer, Prompting, Alignment",
    findings: "Organizes the major advances, applications, and open challenges of LLM research.",
    limitations: "Survey coverage depends on publication cutoff and rapidly evolving literature.",
  },
  "Deep Residual Learning for Image Recognition": {
    authors: "He et al. (2015)",
    objective: "Enable training of deeper neural networks for image recognition.",
    methodology: "Residual connections that learn identity mappings across network layers.",
    technologies: "ResNet, CNN, Residual Blocks",
    findings: "Deeper residual networks improved image recognition benchmark performance.",
    limitations: "Deep models require significant compute and are primarily designed for visual tasks.",
  },
  "Generative Adversarial Networks": {
    authors: "Goodfellow et al. (2014)",
    objective: "Learn to generate data resembling a real data distribution.",
    methodology: "Adversarial training between a generator and discriminator.",
    technologies: "Generator, Discriminator, Adversarial Training",
    findings: "Introduced a framework for learning generative models through competition.",
    limitations: "Training can be unstable and mode collapse can occur.",
  },
  "An Image is Worth 16x16 Words": {
    authors: "Dosovitskiy et al. (2020)",
    objective: "Apply Transformer architecture directly to image recognition.",
    methodology: "Split images into patches and process them as token sequences.",
    technologies: "Vision Transformer, Image Patches, Transformer Encoder",
    findings: "Transformers can perform well in image classification with sufficient pre-training.",
    limitations: "Strong performance often depends on large-scale pre-training data.",
  },
};

const comparisonFields = [
  { label: "AUTHORS & YEAR", key: "authors", icon: "👥" },
  { label: "RESEARCH OBJECTIVE", key: "objective", icon: "🎯" },
  { label: "METHODOLOGY", key: "methodology", icon: "⚙️" },
  { label: "TECHNOLOGIES", key: "technologies", icon: "💻" },
  { label: "KEY FINDINGS", key: "findings", icon: "💡" },
  { label: "LIMITATIONS", key: "limitations", icon: "⚠️" },
];

function Compare() {
  const [paperA, setPaperA] = useState(papers[0]);
  const [paperB, setPaperB] = useState(papers[1]);

  const dataA = comparisonData[paperA];
  const dataB = comparisonData[paperB];

  return (
    <div className="compare-page">
      <div className="compare-header">
        <div>
          <span className="compare-eyebrow">RESEARCH INTELLIGENCE</span>
          <h1>Compare Papers</h1>
          <p>Discover similarities, differences, and research insights across papers.</p>
        </div>
      </div>

      <div className="compare-selector-card">
        <div className="compare-selector-heading">
          <div>
            <h2>Select Research Papers</h2>
            <p>Choose two papers to begin your comparison.</p>
          </div>
          <span className="compare-selector-badge">⚖️ Side-by-side</span>
        </div>

        <div className="compare-selectors">
          <div className="compare-select-box">
            <label>📘 PAPER A</label>
            <select value={paperA} onChange={(e) => setPaperA(e.target.value)}>
              {papers.map((paper) => (
                <option key={paper} value={paper} disabled={paper === paperB}>
                  {paper}
                </option>
              ))}
            </select>
          </div>

          <div className="compare-vs">VS</div>

          <div className="compare-select-box">
            <label>📗 PAPER B</label>
            <select value={paperB} onChange={(e) => setPaperB(e.target.value)}>
              {papers.map((paper) => (
                <option key={paper} value={paper} disabled={paper === paperA}>
                  {paper}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="compare-results-header">
        <h2>Comparison Overview</h2>
        <p>Explore each paper across key research dimensions.</p>
      </div>

      <div className="compare-table">
        <div className="compare-table-header">
          <div className="compare-dimension-heading">RESEARCH DIMENSION</div>
          <div className="compare-paper-heading paper-a-heading">
            <span>📘 PAPER A</span>
            <h3>{paperA}</h3>
          </div>
          <div className="compare-paper-heading paper-b-heading">
            <span>📗 PAPER B</span>
            <h3>{paperB}</h3>
          </div>
        </div>

        {comparisonFields.map((field) => (
          <div className="compare-row" key={field.key}>
            <div className="compare-dimension">
              <span>{field.icon}</span>
              <h4>{field.label}</h4>
            </div>
            <div className="compare-cell">
              {dataA[field.key]}
            </div>
            <div className="compare-cell">
              {dataB[field.key]}
            </div>
          </div>
        ))}
      </div>

      <div className="compare-insight-card">
        <div className="compare-insight-icon">✨</div>
        <div>
          <span>COMPARISON INSIGHT</span>
          <h3>Understand how research approaches differ</h3>
          <p>
            Compare objectives, techniques, and findings side by side to identify
            how different research approaches address related challenges.
            AI-generated comparison insights will be available once connected
            to the analysis backend.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Compare;
