import React from "react";
import "./components/Css/App.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Navbar/Navbar";

import { Outlet, Link } from "react-router-dom";

const App = () => {
    return (
        <>
            <header>
                <Nav />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>

            </footer>
        </>
    )
}

export default App;