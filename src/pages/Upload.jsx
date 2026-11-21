
import { useState } from "react";
import readPDF from "../utils/pdfReader";

function getSection(text, sectionName) {
  if (!text) return "No analysis available yet.";

  const sections = [
    "Summary",
    "Key Findings",
    "Research Methodology",
    "Strengths",
    "Limitations",
    "Future Scope",
  ];

  const findHeading = (name) =>
    new RegExp(
      String.raw`(?:^|\n)\s*(?:#{1,3}\s*)?(?:\*\*)?(?:\d+[.)]\s*)?${name}(?:\*\*)?\s*:?\s*`,
      "i"
    );

  const match = findHeading(sectionName).exec(text);

  if (!match) {
    return "This information was not separately identified in the AI analysis.";
  }

  const start = match.index + match[0].length;
  let end = text.length;

  sections.forEach((section) => {
    if (section === sectionName) return;

    const nextMatch = findHeading(section).exec(text.slice(start));

    if (nextMatch && start + nextMatch.index < end) {
      end = start + nextMatch.index;
    }
  });

  return (
    text.slice(start, end).trim() ||
    "No separate information was returned for this section."
  );
}

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [topic, setTopic] = useState("");
  const [papers, setPapers] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [paperText, setPaperText] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setIsAnalyzed(false);
      setAnalysis("");
      setAnswer("");
      setQuestion("");
      setPaperText("");
    } else if (file) {
      alert("Please select a PDF file.");
    }
  };

  // REAL PDF + AI ANALYSIS
  const analyzePaper = async () => {
    if (!selectedFile) {
      alert("Please upload a research paper first.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const extractedText = await readPDF(selectedFile);

      if (!extractedText.trim()) {
        throw new Error("No readable text found in this PDF.");
      }

      // Save extracted text for future Ask AI questions
      setPaperText(extractedText);

      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paperText: extractedText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI analysis failed.");
      }

      if (!data.analysis) {
        throw new Error("The AI returned an empty analysis.");
      }

      setAnalysis(data.analysis);
      setIsAnalyzed(true);
      setActiveTab("summary");
    } catch (error) {
      console.error("Paper analysis error:", error);
      alert(error.message || "Something went wrong while analyzing the paper.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // REAL RESEARCH PAPER SEARCH USING OPENALEX
  const findPapers = async () => {
    if (!topic.trim()) {
      alert("Please enter a research topic.");
      return;
    }

    setIsSearching(true);
    setSearchError("");
    setPapers([]);

    try {
      const response = await fetch(
        `http://localhost:5000/api/search?topic=${encodeURIComponent(topic.trim())}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to search research papers.");
      }

      setPapers(data.papers || []);

      if (!data.papers || data.papers.length === 0) {
        setSearchError("No research papers found. Try another topic.");
      }
    } catch (error) {
      console.error("Research search error:", error);
      setSearchError(error.message || "Unable to connect to the research database.");
    } finally {
      setIsSearching(false);
    }
  };

  // ASK AI QUESTIONS ABOUT THE UPLOADED PAPER
  const askAI = async () => {
    if (!question.trim() || isAsking) return;

    if (!paperText) {
      setAnswer("Please upload and analyze a research paper first.");
      return;
    }

    setIsAsking(true);
    setAnswer("");

    try {
      const response = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paperText,
          question: question.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to answer your question.");
      }

      setAnswer(data.answer || "The AI returned an empty answer.");
    } catch (error) {
      console.error("Ask AI error:", error);
      setAnswer(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsAsking(false);
    }
  };

  // ANALYSIS SCREEN
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

          <div className="analysis-status">✓ Analysis Complete</div>
        </div>

        <div className="analysis-layout">
          <aside className="analysis-sidebar">
            <div className="file-summary">
              <div className="file-icon">📄</div>
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
                className={activeTab === "limitations" ? "active" : ""}
                onClick={() => setActiveTab("limitations")}
              >
                ⚠️ Limitations
              </button>
            </div>

            <button
              className="new-analysis-button"
              onClick={() => {
                setIsAnalyzed(false);
                setSelectedFile(null);
                setAnalysis("");
                setPaperText("");
                setAnswer("");
                setQuestion("");
              }}
            >
              + Analyze Another Paper
            </button>
          </aside>

          <main className="analysis-content">
            {activeTab === "summary" && (
              <section className="analysis-section">
                <div className="content-title">
                  <div className="content-icon">✨</div>
                  <div>
                    <h2>AI Summary</h2>
                    <p>Key information extracted from the paper</p>
                  </div>
                </div>

                <div className="insight-card">
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {getSection(analysis, "Summary")}
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

            {activeTab === "findings" && (
              <section className="analysis-section">
                <div className="content-title">
                  <div className="content-icon">💡</div>
                  <div>
                    <h2>Key Findings</h2>
                    <p>Important findings identified from the research</p>
                  </div>
                </div>

                <div className="finding-list">
                  <div className="finding-item">
                    <span>01</span>
                    <div>
                      <h3>AI-Generated Findings</h3>
                      <p style={{ whiteSpace: "pre-wrap" }}>
                        {getSection(analysis, "Key Findings")}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "methodology" && (
              <section className="analysis-section">
                <div className="content-title">
                  <div className="content-icon">🧪</div>
                  <div>
                    <h2>Research Methodology</h2>
                    <p>How the research was conducted</p>
                  </div>
                </div>

                <div className="methodology-card">
                  <div>
                    <span>01</span>
                    <h3>Research Methodology</h3>
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {getSection(analysis, "Research Methodology")}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "limitations" && (
              <section className="analysis-section">
                <div className="content-title">
                  <div className="content-icon">⚠️</div>
                  <div>
                    <h2>Limitations</h2>
                    <p>Challenges identified in the paper</p>
                  </div>
                </div>

                <div className="insight-card">
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {getSection(analysis, "Limitations")}
                  </p>
                </div>

                <div className="content-title">
                  <div className="content-icon">🚀</div>
                  <div>
                    <h2>Future Scope</h2>
                    <p>Possible directions for further research</p>
                  </div>
                </div>

                <div className="insight-card">
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {getSection(analysis, "Future Scope")}
                  </p>
                </div>

                <div className="content-title">
                  <div className="content-icon">💪</div>
                  <div>
                    <h2>Strengths</h2>
                    <p>Positive aspects of the research</p>
                  </div>
                </div>

                <div className="insight-card">
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {getSection(analysis, "Strengths")}
                  </p>
                </div>
              </section>
            )}

            <section className="ask-ai">
              <div className="ask-ai-header">
                <div className="ask-ai-icon">✨</div>
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
                    if (event.key === "Enter") askAI();
                  }}
                />

                <button onClick={askAI} disabled={isAsking || !question.trim()}>
                  {isAsking ? "Thinking..." : "Ask AI"}
                </button>
              </div>

              {isAsking && (
                <p style={{ marginTop: "12px" }}>
                  ✨ PaperInsight AI is reading your question...
                </p>
              )}

              {answer && (
                <div className="ai-answer">
                  <strong>Response</strong>
                  <p style={{ whiteSpace: "pre-wrap" }}>{answer}</p>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    );
  }

  // UPLOAD AND SEARCH SCREEN
  return (
    <div className="upload-page">
      <div className="upload-header">
        <span className="section-label">PAPERINSIGHT AI</span>
        <h1>Analyze Your Research Paper</h1>
        <p>
          Upload a research paper and let AI transform complex academic
          content into clear summaries, findings, and insights.
        </p>
      </div>

      <section className="feature-section">
        <div className="section-icon">📄</div>
        <h2>Upload Research Paper</h2>
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

            <div style={{ fontSize: "32px", marginBottom: "12px" }}>↑</div>

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
                <span>📄</span>
                <div>
                  <strong>{selectedFile.name}</strong>
                  <small>
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </small>
                </div>
              </div>

              <div className="file-ready">✓</div>
            </div>

            {!isAnalyzing && (
              <button className="analyze-button" onClick={analyzePaper}>
                ✨ Analyze Paper
              </button>
            )}

            {isAnalyzing && (
              <div className="analyzing-state">
                <div className="loading-spinner"></div>
                <h3>AI is analyzing your paper...</h3>
                <p>
                  Extracting important information and generating insights.
                  This may take a little while.
                </p>
              </div>
            )}
          </>
        )}
      </section>

      <div className="section-divider">
        <span>OR</span>
      </div>

      <section className="feature-section">
        <div className="section-icon">🔎</div>
        <h2>Find Research Papers</h2>
        <p>
          Enter a topic and discover real research papers from academic
          publications.
        </p>

        <div className="topic-search">
          <input
            type="text"
            placeholder="Example: Artificial Intelligence in Healthcare"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") findPapers();
            }}
          />

          <button onClick={findPapers} disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>

        {isSearching && (
          <p style={{ textAlign: "center", marginTop: "18px" }}>
            Searching academic publications...
          </p>
        )}

        {searchError && (
          <p
            style={{
              color: "#dc2626",
              textAlign: "center",
              marginTop: "18px",
            }}
          >
            {searchError}
          </p>
        )}
      </section>

      {papers.length > 0 && (
        <section className="research-results">
          <h2>Research Papers Found</h2>

          <p className="results-topic">
            Results related to: <strong>{topic}</strong>
          </p>

          <div className="research-paper-grid">
            {papers.map((paper) => (
              <div className="research-paper-card" key={paper.id}>
                <div className="research-paper-icon">📄</div>

                <h3>{paper.title}</h3>

                <p className="paper-meta">
                  {paper.authors} • {paper.year}
                </p>

                <p>{paper.description}</p>

                {paper.isOpenAccess && (
                  <p style={{ color: "#16834a", fontSize: "12px" }}>
                    ✓ Open Access
                  </p>
                )}

                <a
                  className="view-paper"
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  View Paper →
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Upload;
