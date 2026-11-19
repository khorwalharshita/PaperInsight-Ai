import "./RecentPapers.css";

const papers = [
  {
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    category: "Deep Learning",
    status: "Analyzed",
    date: "Nov 18, 2026",
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    authors: "Devlin et al.",
    category: "NLP",
    status: "Analyzed",
    date: "Nov 16, 2026",
  },
  {
    title: "A Survey on Large Language Models",
    authors: "Zhao et al.",
    category: "Artificial Intelligence",
    status: "Pending",
    date: "Nov 15, 2026",
  },
];

function RecentPapers() {
  return (
    <section className="recent-papers">
      <div className="recent-papers-header">
        <div>
          <h2>Recent Papers</h2>
          <p>Your latest research uploads and analysis</p>
        </div>
        <button className="view-all-button">View all →</button>
      </div>

      <div className="papers-list">
        {papers.map((paper, index) => (
          <div className="paper-row" key={index}>
            <div className="paper-icon">📄</div>

            <div className="paper-info">
              <h3>{paper.title}</h3>
              <p>{paper.authors} · {paper.category}</p>
            </div>

            <span className={`paper-status ${paper.status.toLowerCase()}`}>
              {paper.status}
            </span>

            <span className="paper-date">{paper.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentPapers;