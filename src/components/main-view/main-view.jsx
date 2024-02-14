import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./main-view.scss";

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

  return (
    <Row>
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
          }} />
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <Button className="button" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
          <MovieView className="movieViewTile" movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </Col>
      ) : moviesFromAPI.length === 0 ? (
        <Col>
          <Button className="button" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
          <div>The list is empty!</div>
        </Col>
      ) : (
        <>
          <Col md={12}><Button className="button" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button></Col>
          {moviesFromAPI.map(movie => (
            <Col className="mb-5 movieCardTile" key={movie._id} md={3}>
            <MovieCard movie={movie} onMovieClick={(newSelectedMovie) => {setSelectedMovie(newSelectedMovie); }} />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
