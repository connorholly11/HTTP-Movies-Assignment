import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/`, {
        params: {}
      })
      .then(response => {
        // const movies= response.data;
        console.log("Movies:", movies);
        setMovies(response.data);
      });
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
        />
      <Route 
        path="/update-movie/:id"
        render = {props => {
          return <UpdateMovie {...props} movies={movies} updateMovie={setMovies} />
        }}
        />
    </>
  );
};

export default App;
