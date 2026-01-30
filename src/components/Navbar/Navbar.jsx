import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Css/Navbar.css";

import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    return (
        <nav className="navbar">
            {/* BRAND */}
            <div className="navbar-brand">
                <Link to="/" className="nav-link">
                    <h1 className="logo">
                        <img src="/logo-met-one.png" alt="Logo" />
                    </h1>
                </Link>
            </div>

            {/* NAV LINKS */}
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <ul className="nav-items">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/TvShows" className="nav-link" onClick={() => setMenuOpen(false)}>
                            TV Shows
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/favourite" className="nav-link" onClick={() => setMenuOpen(false)}>
                            My List
                        </Link>
                    </li>
                </ul>
            </div>

            {/* SEARCH FORM */}
            <form onSubmit={handleSearch} className="navbar-search-form">
                <input
                    type="text"
                    placeholder="Titles, people, genres"
                    className="navbar-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="navbar-search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>

            {/* TOGGLE */}
            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>
        </nav>
    );
};

export default Navbar;
