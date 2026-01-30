const API_KEY = "0a29d0b18a015f5b930e495750ce3de4";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovie = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.results;
};

export const searchTvShows = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.results;
};

export const getMoviesByGenre = async (genreId) => {
    const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );
    const data = await response.json();
    return data.results;
};
