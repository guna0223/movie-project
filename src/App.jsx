import React from "react";
import "./App.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import MovieCard from "./components/MovieCard/MovieCard";
import Nav from "./components/Navbar/Navbar";
import Home from "./pages/Home";


const App = () => {
    return (
        <>
            <header>
                <Nav />
            </header>
            <main>
                <Home />
            </main>
            <footer>

            </footer>
        </>
    )
}

export default App;