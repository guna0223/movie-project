import MovieCard from "../components/MovieCard/MovieCard";
import { useState } from "react";


const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        {
            id: 1,
            title: "John Wick",
            release_date: "2020"
        },
        {
            id: 2,
            title: "John Wick-2",
            release_date: "2022"
        },
        {
            id: 3,
            title: "John Wick-3",
            release_date: "2024"
        },
        {
            id: 4,
            title: "John Wick-4",
            release_date: "2025"
        },
        {
            id: 5,
            title: "3",
            release_date: "2027"
        }
    ];
    const handelSearch = (e) => {
        e.preventDefault();
        alert(searchQuery);
    }

    return (
        <>
            <div className="home">
                <form onSubmit={handelSearch} className="search-form">
                    <input type="text"
                        placeholder="Search for movie"
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit"
                        className="search-button">Search</button>
                </form>

                <div className="container-fluid">
                    <div className="row movie-grid">
                        {movies.map(
                            (movie) =>
                                movie.title.toLocaleLowerCase().startsWith(searchQuery) && (
                                    <MovieCard movie={movie} key={movie.id} />
                                )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;