import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const navigation = [
  { label: "Dashboard", path: "/", icon: "⌂" },
  { label: "My Library", path: "/library", icon: "▤" },
  { label: "AI Analysis", path: "/analysis", icon: "✧" },
  { label: "AI Assistant", path: "/assistant", icon: "◉" },
  { label: "Compare Papers", path: "/compare", icon: "⇄" },
  { label: "Research Graph", path: "/graph", icon: "⌘" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">P</div>
        <span>PaperInsight <span className="brand-ai">AI</span></span>
      </div>

      <div className="sidebar-section-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/upload" className="sidebar-upload">
          <span>＋</span> Upload a Paper
        </NavLink>

        <NavLink to="/settings" className="sidebar-link settings-link">
          <span className="sidebar-link-icon">⚙</span>
          <span>Settings</span>
        </NavLink>

        <div className="sidebar-profile">
          <div className="profile-avatar">M</div>
          <div className="profile-info">
            <strong>My Workspace</strong>
            <span>Researcher</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;