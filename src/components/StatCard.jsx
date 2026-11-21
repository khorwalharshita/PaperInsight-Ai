import "./StatCard.css";
function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-card-title">{title}</span>
        <span className="stat-card-icon">{icon}</span>
      </div>

      <h2 className="stat-card-value">{value}</h2>
      <p className="stat-card-subtitle">{subtitle}</p>
    </div>
  );
}

export default StatCard;