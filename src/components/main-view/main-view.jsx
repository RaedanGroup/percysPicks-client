import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss";

export function MainView() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [moviesFromAPI, setMovies] = useState([]);
  const [favoriteUpdated, setFavoriteUpdated] = useState(false);

  const handleUpdateFavorite = () => {
    // Fetch updated user data after toggling favorite
    fetch(`https://percys-picks-a2286948842a.herokuapp.com/users/${user.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(data => {
        // Update user state with updated favorite movies
        setUser(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  };

  useEffect(() => {
    // Fetch movies only if user data is available
  if (user && token) {
    // If favorite has not been updated yet, update it
    if (!favoriteUpdated) {
      handleUpdateFavorite();
      setFavoriteUpdated(true); // Set favoriteUpdated to true after update
    }

      // Then, fetch movies
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
    }
  }, [user, token, favoriteUpdated]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="main-view justify-content-md-center">
        <Routes>
          <Route path="/signup" element={
            <>{user ? (<Navigate to="/"/>
            ) : (
              <Col md={5}>
                <SignupView />
              </Col>
            )}</>
          }/>
          <Route path="/login" element={
            <>{user ? (<Navigate to="/"/>
            ) : (
              <Col md={5}>
                <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token);}} />
              </Col>
            )}</>
          }/>
          <Route path="/profile/:username" element={
            <>{!user ? (
              <Navigate to="/login" replace />
            ) : (
              <Col md={8}>
                <ProfileView user={user} token={token} onRemoveFavorite={handleUpdateFavorite}/>
              </Col>
            )}</>
          }/>
          <Route path="/movies/:movieId" element={
            <>{!user ? (
              <Navigate to="/login" replace />
            ) : moviesFromAPI.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <Col md={8}>
                <MovieView className="movieViewTile" movies={moviesFromAPI} />
              </Col>
            )}</>
          }/>
          <Route path="/" element={
            <>{!user ? (
              <Navigate to="/login" replace />
            ) : moviesFromAPI.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <>{moviesFromAPI.map(movie => (
                <Col className="mb-5 movieCardTile" key={movie._id} md={3}>
                  <MovieCard movie={movie} user={user} token={token} onToggleFavorite={handleUpdateFavorite}/>
                </Col>
              ))}</>
            )}</>
          }/>
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
