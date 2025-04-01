import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { translateText } from './translation'; // Import the translation function

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [translatedOverview, setTranslatedOverview] = useState(''); // State for translated text
  const [isTranslated, setIsTranslated] = useState(false); // State to track if translation is done

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const translateOverview = async () => {
    if (!movie || !movie.overview) return;

    try {
      const translatedText = await translateText(movie.overview, 'en', 'ar');
      setTranslatedOverview(translatedText);
      setIsTranslated(true);
    } catch (error) {
      console.error("Error translating text:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      )}
      <div className="movie-info">
        <p>
          {isTranslated ? translatedOverview : movie.overview} {/* Show translated or original text */}
        </p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average}</p>
      </div>
      <button onClick={translateOverview} className="translate-button">
        Translate to Arabic
      </button>
      <Link to="/" className="back-link">Back to Search</Link>
    </div>
  );
}

export default MovieDetails;
