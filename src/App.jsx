import React from "react";
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import MovieCard from "./components/MovieCard/MovieCard";
import Home from "./pages/Home";


const App = () => {
    return (
        <>
            <div className="container-fluid " >
                <div className="row  row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    <Home />
                </div>
            </div>
        </>
    )
}

export default App;