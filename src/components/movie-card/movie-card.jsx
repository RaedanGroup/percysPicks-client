import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
<<<<<<< Updated upstream
    <div onClick={() => { onMovieClick(movie); }}> {movie.Title} </div>
=======
    <Card className="h-100 movieCard" style={{ cursor: 'pointer' }}>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`} style={{ cursor: 'pointer' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body className='movieCardBody'>
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
>>>>>>> Stashed changes
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};