import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useParams, useNavigate } from 'react-router-dom';
import './profile-view.scss';

export const ProfileView = ({ user, token, onRemoveFavorite, loggedOut }) => {
  const { username } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [userData, setUserData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    username: '',
    password: '',
    email: '',
    birthday: ''
  });
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Fetch user data and favorite movies
    fetchUserData();
  }, [username, token]);

  const fetchUserData = () => {
    fetch(`https://percys-picks-a2286948842a.herokuapp.com/users/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setUpdatedData({
          username: data.username,
          email: data.email,
          birthday: data.birthday
        });
        // Fetch favorite movies details
        fetchFavoriteMovies(data.favoriteMovies);
      })
      .catch(error => console.error('Error fetching user data:', error));
  };

  const fetchFavoriteMovies = (favoriteMovieIds) => {
    // Fetch all movies
    fetch(`https://percys-picks-a2286948842a.herokuapp.com/movies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(movies => {
      // Filter favorite movies based on their IDs
      const favoriteMovies = movies.filter(movie => favoriteMovieIds.includes(movie._id));
      console.log('Favorite movies:', favoriteMovies);
      setFavoriteMovies(favoriteMovies);
    })
    .catch(error => console.error('Error fetching favorite movies:', error));
  };
  
  

  const handleUpdate = () => {
    // Send updated user data to the backend
    fetch(`https://percys-picks-a2286948842a.herokuapp.com/users/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    })
      .then(response => {
        if (response.ok) {
          alert('User information updated successfully');
          // Reload user data after successful update
          fetchUserData();
          navigate(`/profile/${updatedData.username}`);
        } else {
          alert('Failed to update user information');
        }
      })
      .catch(error => console.error('Error updating user data:', error));
  };

  const handleRemoveFavorite = (movieTitle) => {
    // Send request to remove movie from favorites
    fetch(`https://percys-picks-a2286948842a.herokuapp.com/users/${username}/favorite/${movieTitle}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        // Update the user data after successful removal
        fetchUserData();
        alert('Movie removed from favorites successfully');
        onRemoveFavorite();
      } else {
        alert('Failed to remove movie from favorites');
      }
    })
    .catch(error => console.error('Error removing movie from favorites:', error));
  };
  

  const handleDeleteAccount = () => {
    // Send request to delete user account
    fetch(`https://percys-picks-a2286948842a.herokuapp.com/users/${username}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          alert('Account deleted successfully');
          loggedOut();
        } else {
          alert('Failed to delete account');
        }
      })
      .catch(error => console.error('Error deleting account:', error));
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <h1 style={{color: 'white'}}>Profile</h1>
      {userData && (
        <Card className='profileCard'>
          <Card.Body>
            <Card.Title className='largeLabel'>{userData.username}</Card.Title>
            <Card.Text>Email: {userData.email}</Card.Text>
            <Card.Text>Birthday: {new Date(userData.birthday).toLocaleDateString()}</Card.Text>
            <Card.Text className='largeLabel'>Favorite Movies:</Card.Text>
            <ul>
              {favoriteMovies.map(movie => (
                <><li className='favMov' key={movie._id}>
                  <a className='favMovLink' href={`/movies/${movie._id}`}>{movie.Title}</a>
                  <div className='remFavMov' onClick={() => handleRemoveFavorite(movie.Title)}>Remove</div>
                </li>
                <hr></hr></>
              ))}
            </ul>
            <hr className="my-4" />
            <Card.Text className="largeLabel">Update:</Card.Text>
            <Form className='updateForm'>
              <Form.Group controlId="formUsername">
                <Form.Label>New Username:</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={updatedData.username}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>New Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={updatedData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formBirthday">
                <Form.Label>New Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  name="birthday"
                  value={updatedData.birthday}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleUpdate}>
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
        <Button variant="danger" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
    </div>
  );
};
