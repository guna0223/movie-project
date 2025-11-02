import React from "react";
import { Link } from "react-router-dom";
import "../Css/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-logo">
                    🎬 <span>MovieHub</span>
                </div>

                <ul className="footer-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/favourites">Favourites</Link></li>
                    <li><a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB API</a></li>
                </ul>

                <p className="footer-text">
                    Built with ❤️ using React & TMDB API
                </p>

                <p className="footer-copy">
                    © {new Date().getFullYear()} MovieHub. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
