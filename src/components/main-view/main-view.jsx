import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export function MainView() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Assigning the movies to the state
  useEffect(() => {
    fetch('https://percys-picks-a2286948842a.herokuapp.com/movies')
      .then(response => response.json())
      .then(data => {
        const moviesFromAPI = data.map(movie => ({
          _id: movie._id.$oid,
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
  }, []);
  
  

  if (movies.length === 0) return <div>The list is empty!</div>;

  if (selectedMovie) {
    return (
    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    )
  }

  return (
    <div>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {setSelectedMovie(newSelectedMovie); }} />
      ))}
    </div>
  );
}