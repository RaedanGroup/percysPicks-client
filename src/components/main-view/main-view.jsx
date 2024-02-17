import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { debounce } from 'lodash';
import './main-view.scss';

export function MainView() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [moviesFromAPI, setMovies] = useState([]);
  const [favoriteUpdated, setFavoriteUpdated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [moviesFiltered, setMoviesFiltered] = useState([]);

  const handleUpdateFavorite = () => {
    fetch(`https://percys-picks-a2286948842a.herokuapp.com/users/${user.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  };

  useEffect(() => {
    if (user && token) {
      if (!favoriteUpdated) {
        handleUpdateFavorite();
        setFavoriteUpdated(true);
      }
      fetch('https://percys-picks-a2286948842a.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          const moviesFromAPI = data.map((movie) => ({
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Birth: movie.Director.Birth,
              Death: movie.Director.Death,
            },
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
          }));
          setMovies(moviesFromAPI);
          setMoviesFiltered(moviesFromAPI);
        })
        .catch((error) => {
          console.error('Error fetching movies:', error);
        });
    }
  }, [user, token, favoriteUpdated]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = debounce((searchTerm) => {
    const filteredMovies = moviesFromAPI.filter((movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMoviesFiltered(filteredMovies);
  }, 300);

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        loggedOut={onLoggedOut}
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
                <ProfileView user={user} token={token} onRemoveFavorite={handleUpdateFavorite} loggedOut={onLoggedOut}/>
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
          <Route
            path="/"
            element={
              <>{!user ? (
                <Navigate to="/login" replace />
              ) : moviesFromAPI.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  <Col md={12}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search movies..."
                        className="searchBar"
                      />
                  </Col>
                  <>{moviesFiltered.map((movie) => (
                    <Col className="mb-5 movieCardTile" key={movie._id} md={3}>
                      <MovieCard
                        movie={movie}
                        user={user}
                        token={token}
                        onToggleFavorite={handleUpdateFavorite}
                      />
                    </Col>
                  ))}</>
                </>
              )}</>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
}
