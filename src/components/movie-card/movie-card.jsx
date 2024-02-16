import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './movie-card.scss';

export const MovieCard = ({ movie, user, token, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(user && user.favoriteMovies.includes(movie._id));

  useEffect(() => {
    setIsFavorite(user && user.favoriteMovies.includes(movie._id));
  }, [user]);

  const handleToggleFavorite = () => {
    const url = `https://percys-picks-a2286948842a.herokuapp.com/users/${user.username}/favorite/${encodeURIComponent(movie.Title)}`;
    const method = isFavorite ? 'DELETE' : 'PUT';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          // Toggle the favorite status
          setIsFavorite(!isFavorite);
          // Call the onToggleFavorite function passed from MainView
          onToggleFavorite();
        }
      })
      .catch(error => console.error('Error toggling favorite:', error));
  };

  return (
    <Card className="h-100 movieCard" style={{ cursor: 'pointer' }}>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`} style={{ cursor: 'pointer' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Director.Name}</Card.Text>
        </Card.Body>
      </Link>
      {user && (
          <div className="favoriteButtonContainer">
            <Button className="favoriteButton" variant={isFavorite ? 'danger' : 'primary'} onClick={handleToggleFavorite}>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>
          )}
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  token: PropTypes.string.isRequired,
  onToggleFavorite: PropTypes.func.isRequired // Prop for toggling favorite status
};
