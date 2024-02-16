import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find(m => m._id === movieId);

  return (
    <Card className="movieView">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/`}>
          <Button className="button" >Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};