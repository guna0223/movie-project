
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Css/Navbar.css"

import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-title">
                    <Link to="/" className="nav-link">
                        <h1>Movie Hub</h1>
                    </Link>
                </div>

                <div className="nav-links">
                    <ul className="nav-items">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/favourite" className="nav-link">Favorite</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;


