import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card className="movieView">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        <Card.Text>{movie.Description}</Card.Text>
      <Button className="button" onClick={onBackClick}>Back</Button>
      </Card.Body>
    </Card>
  );
};