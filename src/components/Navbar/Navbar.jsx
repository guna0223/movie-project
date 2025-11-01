import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css"
import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-title">
                    <Link to="/" className="nav-link"><h1>Movie</h1> </Link>
                </div>
                <div className="nav-links">
                    <ul className="nav-items">
                        <Link to="MovieCard" className="nav-link"><li className="nav-item">Home </li></Link>
                        <Link to="Favourite" className="nav-link"> <li className="nav-item ">Favourite</li></Link>
                    </ul>
                </div>
            </nav>
        </>


    );
}

export default Navbar;

