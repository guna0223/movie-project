import React from "react";
import { Link } from "react-router-dom";
import "../Css/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Brand */}
                <div className="footer-brand">
                    <h2 className="footer-logo">CineHub</h2>
                    <p className="footer-tagline">
                        Discover movies, explore genres, and build your watchlist.
                    </p>
                </div>

                {/* Navigation */}
                <div className="footer-nav">
                    <h4>Explore</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/favourite">Favorites</Link></li>
                        <li>
                            <a
                                href="https://www.themoviedb.org/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                TMDB API
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Tech Stack */}
                <div className="footer-tech">
                    <h4>Tech Stack</h4>
                    <p>React · JavaScript · CSS · TMDB API</p>
                </div>

            </div>

            {/* Bottom */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} CineHub. All rights reserved.</p>
                <p>Built with ❤️ by You</p>
            </div>
        </footer>

    );
};

export default Footer;
