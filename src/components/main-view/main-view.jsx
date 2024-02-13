import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export function MainView() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [moviesFromAPI, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetching the movies
  useEffect(() => {
    if (!token) return;
  
    fetch("https://percys-picks-a2286948842a.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Movies fetched successfully:", data);
        const moviesFromAPI = data.map(movie => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: {
            Name: movie.Genre.Name,
            Description: movie.Genre.Description
          },
          Director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birth: movie.Director.Birth,
            Death: movie.Director.Death
          },
          ImagePath: movie.ImagePath,
          Featured: movie.Featured
        }));
  
        setMovies(moviesFromAPI);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching movies:', error);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  if (moviesFromAPI.length === 0) {
    return (
      <div>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        <div>The list is empty!</div>
      </div>
    );
  }
  
  if (selectedMovie) {
    return (
      <div>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      {moviesFromAPI.map(movie => (
        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => {setSelectedMovie(newSelectedMovie); }} />
      ))}
    </div>
  );
}
