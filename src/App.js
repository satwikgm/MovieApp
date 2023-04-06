import React , { useState , useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=50067d49";

const App = () => {

  // Initial value of search term is an empty string "".
  // current value of searchTerm = "" 
  // setSearchTerm = Function to update the value of searchTerm
  // Used this to manage a search input bar
  const [searchTerm , setSearchTerm] = useState("");

  // Initial value of movies = []
  const [movies , setMovies] = useState([]);

  // useEffect hook to perdorm some side effects when the component renders
  // In this case the effect is called searchMovies function with the string "Batman" as an argument
  // This will update the movies state cariables with an array of movies related to batman
  // The useEffect hook is called with an empty dependency array ([]), which means that the effect\
  // will only be run once, when the component first renders
  useEffect(() => {
    searchMovies("Batman");
  } , [])

  const searchMovies = async (title) => {
    // Fetches data from an api and updates the component's state using the setMovies function
    // fetch -> To make a GET request to the API end point with the movie title passed as a query parameter `s`
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();     // Response converted to JSON

    setMovies(data.Search);
  }

  return (
    <div className="app">
      <h1>MovieHub......</h1>

      {/* Search Bar */}
      <div className="search">
          {/* The onchange attribute is set to a function will be called whenever the user types something in the input field , The function takes an event "e" as a parameter and it calls the setSearchTerm function with the current value of the input field(i.e -> e.target.value)  */}
          {/* e -> event of typing  ,  e.target.value -> Current value of event(text in input box)  */}
          <input value={searchTerm}  placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)}/>
          <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm) }/>
      </div>

      {/* Conditional Rendering : Either displays a list of movie cards or a message if none to display */}
      {/* If there are movies to display a div element with class container is rendered */}
      {movies?.length > 0 ? (
          <div className="container">
              {movies.map((movie) => (
                  <MovieCard movie={movie}/>
              ))}
          </div>
      ) : (
            <div className="empty">
                <h2>No movies found</h2>
            </div>
      )}
    </div>
  )
}

export default App;
