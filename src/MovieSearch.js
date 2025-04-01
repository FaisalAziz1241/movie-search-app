import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import './App.css';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]); // For search results
  const [featuredMovies, setFeaturedMovies] = useState([]); // For featured movies
  const [loading, setLoading] = useState(false);
  const [featuredLoading, setFeaturedLoading] = useState(true); // Loading state for featured movies
  const [hasSearched, setHasSearched] = useState(false); // Track if a search has been performed
  const navigate = useNavigate();

  // Fetch featured movies on component mount
  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setFeaturedMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      } finally {
        setFeaturedLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  // Search for movies
  const searchMovies = async () => {
    if (!query.trim()) {
      alert("Please enter a movie title.");
      return;
    }

    setLoading(true);
    setHasSearched(true); // Indicate that a search has been performed
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("Failed to fetch movies. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to movie details
  const navigateToDetails = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button onClick={searchMovies} disabled={loading}>
          {loading ? (
            <ClipLoader size={20} color="#ffffff" />
          ) : (
            "Search"
          )}
        </button>
      </div>

      {/* Display Featured Movies if no search has been performed */}
      {!hasSearched && (
        <div className="featured-movies">
          <h2>Popular Movies</h2>
          {featuredLoading ? (
            <div>Loading featured movies...</div>
          ) : (
            <div className="movie-list">
              {featuredMovies.map((movie) => (
                <div key={movie.id} className="movie-card" onClick={() => navigateToDetails(movie.id)}>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-poster"
                    />
                  ) : (
                    <div className="poster-placeholder">No Poster Available</div>
                  )}
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date}</p>
                  <p>Rating: {movie.vote_average}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Display Search Results if a search has been performed */}
      {hasSearched && (
        <div className="search-results">
          <h2>Search Results</h2>
          {loading ? (
            <div>Loading search results...</div>
          ) : movies.length > 0 ? (
            <div className="movie-list">
              {movies.map((movie) => (
                <div key={movie.id} className="movie-card" onClick={() => navigateToDetails(movie.id)}>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-poster"
                    />
                  ) : (
                    <div className="poster-placeholder">No Poster Available</div>
                  )}
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date}</p>
                  <p>Rating: {movie.vote_average}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>No movies found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieSearch;