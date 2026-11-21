import "./Home.css";
import StatCard from "../components/StatCard";
import RecentPapers from "../components/RecentPapers";
import QuickActions from "../components/QuickActions";

function Home() {
  return (
    <div className="dashboard-home">
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <h1>Good afternoon, Researcher 👋</h1>
        <p>Your research workspace, all in one place.</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Papers"
          value="24"
          subtitle="Papers in your library"
          icon="📚"
        />

        <StatCard
          title="Analyzed"
          value="18"
          subtitle="AI analyzed papers"
          icon="✨"
        />

        <StatCard
          title="Bookmarked"
          value="7"
          subtitle="Saved for later"
          icon="🔖"
        />

        <StatCard
          title="This Week"
          value="5"
          subtitle="Papers added this week"
          icon="📈"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Papers */}
      <RecentPapers />
    </div>
  );
}

export default Home;