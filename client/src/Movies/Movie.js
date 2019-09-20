import React from "react";
import {NavLink} from 'react-router-dom';
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }



  deleteItem = e => {
    e.preventDefault()
    axios
        .delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
        .then(res => {
            console.log('delete', res)
            // props.updateMovie(res.data)
            this.props.history.push(`/`)
        })
        .catch(err => {
            console.log(err)
        })
}

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick= { () => this.props.history.push(`/update-movie/${this.state.movie.id}`)}> Edit </button>
        <button onClick={this.deleteItem}> Delete </button>
        
      </div>
    );
  }
}
