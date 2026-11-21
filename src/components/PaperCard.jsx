
import "./PaperCard.css";

function PaperCard({
  title,
  authors,
  category,
  status = "Analyzed",
  date,
  tags = [],
  icon = "📄",
  onView,
}) {
  return (
    <div className="paper-card">
      <div className="paper-card-top">
        <div className="paper-card-icon">{icon}</div>

        <span
          className={`paper-card-status ${
            status === "Analyzed" ? "analyzed" : "pending"
          }`}
        >
          {status === "Analyzed" ? "✓ Analyzed" : "◷ Pending"}
        </span>
      </div>

      <div className="paper-card-content">
        <span className="paper-card-category">{category}</span>
        <h3>{title}</h3>
        <p className="paper-card-authors">{authors}</p>

        <div className="paper-card-tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="paper-card-footer">
        <span className="paper-card-date">📅 {date}</span>

        <button type="button" onClick={onView}>
          {status === "Analyzed" ? "View Analysis ↗" : "Analyze →"}
        </button>
      </div>
    </div>
  );
}

export default PaperCard;
