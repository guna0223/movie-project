import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Css/Navbar.css";

import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";

import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">

            {/* BRAND */}
            <div className="navbar-title">
                <Link to="/" className="nav-link">
                    <h1 className="logo"><img src="/logo-met-one.png" alt="skjfdsjf" /></h1>
                </Link>
            </div>

            {/* TOGGLE */}
            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            {/* NAV LINKS */}
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <ul className="nav-items">
                    <li className="nav-item">
                        <Link
                            to="/"
                            className="nav-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            to="/favourite"
                            className="nav-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            Favorite
                        </Link>
                    </li>
                </ul>
            </div>

        </nav>
    );
};

export default Navbar;
