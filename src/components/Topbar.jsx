import "./Topbar.css";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-heading">
        <h2>Research Workspace</h2>
        <p>Welcome back! Continue exploring your research.</p>
      </div>

      <div className="topbar-actions">
        <div className="topbar-search">
          <span className="search-icon">⌕</span>
          <input type="text" placeholder="Search papers, topics..." />
          <span className="search-shortcut">⌘ K</span>
        </div>

        <button className="notification-button" aria-label="Notifications">
          ♧
          <span className="notification-dot"></span>
        </button>

        <div className="topbar-avatar">M</div>
      </div>
    </header>
  );
}

export default Topbar;