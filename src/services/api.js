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

// Top Rated Movies - All Languages
export const getTopRatedMovies = async () => {
    const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.results;
};

// Top Rated Tamil Movies (India)
export const getTopRatedTamilMovies = async () => {
    const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ta&region=IN&sort_by=vote_average.desc&vote_count.gte=100`
    );
    const data = await response.json();
    return data.results;
};

// Top Rated Hollywood Movies (US)
export const getTopRatedHollywoodMovies = async () => {
    const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&region=US&sort_by=vote_average.desc&vote_count.gte=100`
    );
    const data = await response.json();
    return data.results;
};

// Language-aware Related Movies
export const getRelatedMoviesByLanguage = async (movieId, language) => {
    // First get similar movies
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    
    // Filter by language if specified
    if (language && language !== 'en') {
        const filtered = data.results?.filter(m => m.original_language === language) || [];
        return filtered.slice(0, 15);
    }
    
    return data.results?.slice(0, 15) || [];
};
