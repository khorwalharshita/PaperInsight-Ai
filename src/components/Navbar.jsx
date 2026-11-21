import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        PaperInsight AI
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload Paper</Link>
      </div>
    </nav>
  );
}

export default Navbar;