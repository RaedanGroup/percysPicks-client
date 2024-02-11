import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export function MainView() {
  const [movies, setMovies] = useState([
    {"_id":{"$oid":"65c577a3a3d9c91327689640"},"Title":"The Third Man","Description":"Pulp novelist Holly Martins travels to shadowy, postwar Vienna, only to find himself investigating the mysterious death of an old friend, Harry Lime.","Genre":{"Name":"Noir","Description":"Noir is a cinematic term used primarily to describe stylish Hollywood crime dramas, particularly those that emphasize cynical attitudes and sexual motivations."},"Director":{"Name":"Carol Reed","Bio":"Sir Carol Reed was an English film director best known for films such as 'The Third Man', 'The Fallen Idol', and 'Oliver!'.","Birth":"1906","Death":"1976"},"ImagePath":"https://www.filmsite.org/posters/thirdman.jpg","Featured":false},
    {"_id":{"$oid":"65c577a3a3d9c9132768963d"},"Title":"Chinatown","Description":"A private detective hired to expose an adulterer finds himself caught up in a web of deceit, corruption, and murder.","Genre":{"Name":"Mystery","Description":"Mystery films are a genre of film that revolves around the solution of a problem or a crime. It focuses on the efforts of the detective, private investigator, or amateur sleuth to solve the mysterious circumstances of an issue by means of clues, investigation, and clever deduction."},"Director":{"Name":"Roman Polanski","Bio":"Roman Polanski is a Polish-French film director, producer, writer, and actor. He has won many awards and is considered one of the greatest directors of all time.","Birth":"1933","Death":null},"ImagePath":"https://upload.wikimedia.org/wikipedia/en/3/38/Chinatownposter1.jpg","Featured":false},
    {"_id":{"$oid":"65c577a3a3d9c91327689645"},"Title":"Blade Runner","Description":"A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.","Genre":{"Name":"Sci-Fi","Description":"Science fiction films are a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception, and time travel, often along with futuristic elements such as spacecraft, robots, or other technologies."},"Director":{"Name":"Ridley Scott","Bio":"Sir Ridley Scott is an English film director and producer. He is best known for directing science fiction horror film 'Alien', and neo-noir dystopian film 'Blade Runner'.","Birth":"1937","Death":null},"ImagePath":"https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_%281982_poster%29.png","Featured":true}
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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