import { useNavigate } from "react-router-dom";
import "./QuickActions.css";

const actions = [
  {
    icon: "📤",
    title: "Upload a Paper",
    description: "Add a research paper to your library",
    color: "purple",
    path: "/upload",
  },
  {
    icon: "✨",
    title: "Analyze Research",
    description: "Extract key insights using AI",
    color: "blue",
    path: "/analysis",
  },
  {
    icon: "⚖️",
    title: "Compare Papers",
    description: "Compare findings across studies",
    color: "orange",
    path: "/compare",
  },
  {
    icon: "💬",
    title: "Ask AI",
    description: "Chat with your research assistant",
    color: "green",
    path: "/assistant",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="quick-actions-section">
      <div className="quick-actions-heading">
        <h2>Quick Actions</h2>
        <p>Jump straight into your research workflow</p>
      </div>

      <div className="quick-actions-grid">
        {actions.map((action, index) => (
          <button
            className="quick-action-card"
            key={index}
            onClick={() => navigate(action.path)}
          >
            <div className={`quick-action-icon ${action.color}`}>
              {action.icon}
            </div>

            <div className="quick-action-text">
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </div>

            <span className="quick-action-arrow">↗</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;