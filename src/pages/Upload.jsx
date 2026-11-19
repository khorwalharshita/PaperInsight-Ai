import { useState } from "react";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [topic, setTopic] = useState("");
  const [papers, setPapers] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setIsAnalyzed(false);
    } else if (file) {
      alert("Please select a PDF file.");
    }
  };

  const analyzePaper = () => {
    if (!selectedFile) {
      alert("Please upload a research paper first.");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);
      setActiveTab("summary");
    }, 1500);
  };

  const findPapers = () => {
    if (!topic.trim()) {
      alert("Please enter a research topic.");
      return;
    }

    setPapers([
      {
        title: `Recent Advances in ${topic}`,
        authors: "Research Authors",
        year: "2025",
        description:
          `An overview of recent research, methods and developments related to ${topic}.`,
      },
      {
        title: `A Comprehensive Study of ${topic}`,
        authors: "Academic Research Group",
        year: "2024",
        description:
          `This paper explores important concepts, challenges and applications related to ${topic}.`,
      },
      {
        title: `${topic}: Current Trends and Future Directions`,
        authors: "International Research Team",
        year: "2024",
        description:
          `A study of current trends and possible future developments in the field of ${topic}.`,
      },
    ]);
  };

  const askAI = () => {
    if (!question.trim()) return;

    setAnswer(
      `Based on the uploaded research paper, the question "${question}" can be explored using the paper's findings, methodology, and conclusions. This response will be connected to the actual AI analysis when the backend is integrated.`
    );
  };

  /* =====================================================
     ANALYSIS SCREEN
  ===================================================== */

  if (isAnalyzed) {
    return (
      <div className="analysis-page">

        <div className="analysis-header">

          <div>
            <span className="section-label">AI RESEARCH ANALYSIS</span>

            <h1>Research Paper Analysis</h1>

            <p>
              AI-powered insights generated from your uploaded research paper.
            </p>
          </div>

          <div className="analysis-status">
            ✓ Analysis Complete
          </div>

        </div>


        <div className="analysis-layout">

          {/* SIDEBAR */}

          <aside className="analysis-sidebar">

            <div className="file-summary">

              <div className="file-icon">
                📄
              </div>

              <div>
                <strong>{selectedFile?.name}</strong>
                <small>PDF Document</small>
              </div>

            </div>


            <div className="analysis-menu">

              <button
                className={activeTab === "summary" ? "active" : ""}
                onClick={() => setActiveTab("summary")}
              >
                📋 Summary
              </button>

              <button
                className={activeTab === "findings" ? "active" : ""}
                onClick={() => setActiveTab("findings")}
              >
                💡 Key Findings
              </button>

              <button
                className={activeTab === "methodology" ? "active" : ""}
                onClick={() => setActiveTab("methodology")}
              >
                🧪 Methodology
              </button>

              <button
                className={activeTab === "references" ? "active" : ""}
                onClick={() => setActiveTab("references")}
              >
                📚 References
              </button>

            </div>


            <button
              className="new-analysis-button"
              onClick={() => {
                setIsAnalyzed(false);
                setSelectedFile(null);
              }}
            >
              + Analyze Another Paper
            </button>

          </aside>


          {/* MAIN CONTENT */}

          <main className="analysis-content">

            {/* SUMMARY */}

            {activeTab === "summary" && (
              <section className="analysis-section">

                <div className="content-title">

                  <div className="content-icon">
                    ✨
                  </div>

                  <div>
                    <h2>AI Summary</h2>
                    <p>Key information extracted from the paper</p>
                  </div>

                </div>


                <div className="insight-card">

                  <p>
                    This research paper presents an analysis of important
                    concepts, techniques, and findings within its research
                    domain. The study examines existing approaches and
                    discusses their effectiveness based on the research
                    methodology used.
                  </p>

                  <p>
                    The research highlights significant findings and provides
                    insights that can be useful for understanding the problem,
                    evaluating existing solutions, and identifying potential
                    areas for future research.
                  </p>

                </div>


                <div className="stats-grid">

                  <div className="stat-card">
                    <span>📄</span>
                    <strong>PDF</strong>
                    <small>Document Type</small>
                  </div>

                  <div className="stat-card">
                    <span>🧠</span>
                    <strong>AI</strong>
                    <small>Analysis Engine</small>
                  </div>

                  <div className="stat-card">
                    <span>✓</span>
                    <strong>Ready</strong>
                    <small>Analysis Status</small>
                  </div>

                </div>

              </section>
            )}


            {/* KEY FINDINGS */}

            {activeTab === "findings" && (
              <section className="analysis-section">

                <div className="content-title">

                  <div className="content-icon">
                    💡
                  </div>

                  <div>
                    <h2>Key Findings</h2>
                    <p>Important findings identified from the research</p>
                  </div>

                </div>


                <div className="finding-list">

                  <div className="finding-item">

                    <span>01</span>

                    <div>
                      <h3>Primary Research Finding</h3>

                      <p>
                        The research identifies a significant relationship
                        between the studied variables and provides evidence
                        supporting the proposed approach.
                      </p>
                    </div>

                  </div>


                  <div className="finding-item">

                    <span>02</span>

                    <div>
                      <h3>Important Observation</h3>

                      <p>
                        The evaluated approach demonstrates meaningful results
                        when compared with existing research methods.
                      </p>
                    </div>

                  </div>


                  <div className="finding-item">

                    <span>03</span>

                    <div>
                      <h3>Research Implication</h3>

                      <p>
                        The findings indicate opportunities for improving
                        existing techniques and exploring new applications.
                      </p>
                    </div>

                  </div>

                </div>

              </section>
            )}


            {/* METHODOLOGY */}

            {activeTab === "methodology" && (
              <section className="analysis-section">

                <div className="content-title">

                  <div className="content-icon">
                    🧪
                  </div>

                  <div>
                    <h2>Research Methodology</h2>
                    <p>How the research was conducted</p>
                  </div>

                </div>


                <div className="methodology-card">

                  <div>
                    <span>01</span>

                    <h3>Research Approach</h3>

                    <p>
                      The study follows a structured research approach to
                      investigate the selected problem and evaluate the
                      proposed solution.
                    </p>
                  </div>


                  <div>
                    <span>02</span>

                    <h3>Data / Dataset</h3>

                    <p>
                      Relevant data and research information were collected
                      and used to evaluate the proposed methodology.
                    </p>
                  </div>


                  <div>
                    <span>03</span>

                    <h3>Evaluation</h3>

                    <p>
                      The proposed approach was evaluated using appropriate
                      parameters and research metrics.
                    </p>
                  </div>

                </div>

              </section>
            )}


            {/* REFERENCES */}

            {activeTab === "references" && (
              <section className="analysis-section">

                <div className="content-title">

                  <div className="content-icon">
                    📚
                  </div>

                  <div>
                    <h2>References</h2>
                    <p>Research references identified in the paper</p>
                  </div>

                </div>


                <div className="reference-list">

                  <div>
                    <span>[01]</span>

                    <p>
                      Research reference identified from the uploaded paper.
                    </p>
                  </div>

                  <div>
                    <span>[02]</span>

                    <p>
                      Academic study related to the research topic.
                    </p>
                  </div>

                  <div>
                    <span>[03]</span>

                    <p>
                      Supporting research publication and previous work.
                    </p>
                  </div>

                  <div>
                    <span>[04]</span>

                    <p>
                      Additional reference used by the researchers.
                    </p>
                  </div>

                </div>

              </section>
            )}


            {/* ASK AI */}

            <section className="ask-ai">

              <div className="ask-ai-header">

                <div className="ask-ai-icon">
                  ✨
                </div>

                <div>
                  <h2>Ask AI About This Paper</h2>

                  <p>
                    Ask questions and explore the research interactively.
                  </p>
                </div>

              </div>


              <div className="question-box">

                <input
                  type="text"
                  placeholder="Ask something about your research paper..."
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      askAI();
                    }
                  }}
                />

                <button onClick={askAI}>
                  Ask AI
                </button>

              </div>


              {answer && (
                <div className="ai-answer">

                  <strong>AI Response</strong>

                  <p>{answer}</p>

                </div>
              )}

            </section>

          </main>

        </div>

      </div>
    );
  }


  /* =====================================================
     UPLOAD SCREEN
  ===================================================== */

  return (
    <div className="upload-page">

      <div className="upload-header">

        <span className="section-label">
          PAPERINSIGHT AI
        </span>

        <h1>
          Analyze Your Research Paper
        </h1>

        <p>
          Upload a research paper and let AI transform complex academic
          content into clear summaries, findings, and insights.
        </p>

      </div>


      {/* UPLOAD */}

      <section className="feature-section">

        <div className="section-icon">
          📄
        </div>

        <h2>
          Upload Research Paper
        </h2>

        <p>
          Upload your research paper in PDF format to begin the analysis.
        </p>


        {!selectedFile && (
          <label className="file-upload">

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
            />

            <div style={{ fontSize: "32px", marginBottom: "12px" }}>
              ↑
            </div>

            <h3
              style={{
                margin: "0 0 8px",
                color: "#374151",
                fontSize: "16px",
              }}
            >
              Drag & drop your PDF here
            </h3>

            <p
              style={{
                margin: "0 0 18px",
                color: "#98a2b3",
                fontSize: "12px",
              }}
            >
              or
            </p>

            <span
              style={{
                display: "inline-block",
                padding: "10px 18px",
                background: "#635bff",
                color: "white",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              Choose PDF
            </span>

            <p
              style={{
                marginTop: "18px",
                marginBottom: 0,
                color: "#a0a4af",
                fontSize: "10px",
              }}
            >
              PDF files only
            </p>

          </label>
        )}


        {selectedFile && (
          <>

            <div className="selected-file">

              <div className="selected-file-info">

                <span>
                  📄
                </span>

                <div>
                  <strong>
                    {selectedFile.name}
                  </strong>

                  <small>
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </small>
                </div>

              </div>


              <div className="file-ready">
                ✓
              </div>

            </div>


            {!isAnalyzing && (
              <button
                className="analyze-button"
                onClick={analyzePaper}
              >
                ✨ Analyze Paper
              </button>
            )}


            {isAnalyzing && (
              <div className="analyzing-state">

                <div className="loading-spinner"></div>

                <h3>
                  AI is analyzing your paper...
                </h3>

                <p>
                  Extracting important information and generating insights.
                </p>

              </div>
            )}

          </>
        )}

      </section>


      {/* DIVIDER */}

      <div className="section-divider">
        <span>OR</span>
      </div>


      {/* RESEARCH DISCOVERY */}

      <section className="feature-section">

        <div className="section-icon">
          🔎
        </div>

        <h2>
          Find Research Papers
        </h2>

        <p>
          Enter a topic and discover research papers related to it.
        </p>


        <div className="topic-search">

          <input
            type="text"
            placeholder="Example: Artificial Intelligence in Healthcare"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                findPapers();
              }
            }}
          />

          <button onClick={findPapers}>
            Search
          </button>

        </div>

      </section>


      {/* RESULTS */}

      {papers.length > 0 && (

        <section className="research-results">

          <h2>
            Research Papers Found
          </h2>

          <p className="results-topic">
            Results related to: <strong>{topic}</strong>
          </p>


          <div className="research-paper-grid">

            {papers.map((paper, index) => (

              <div
                className="research-paper-card"
                key={index}
              >

                <div className="research-paper-icon">
                  📄
                </div>

                <h3>
                  {paper.title}
                </h3>

                <p className="paper-meta">
                  {paper.authors} • {paper.year}
                </p>

                <p>
                  {paper.description}
                </p>

                <button className="view-paper">
                  View Paper →
                </button>

              </div>

            ))}

          </div>

        </section>

      )}

    </div>
  );
}

export default Upload;