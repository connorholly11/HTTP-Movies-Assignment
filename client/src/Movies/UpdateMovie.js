import React, {useState} from 'react';
import axios from 'axios';

const initialState = {
    // id: 5,
    title: '',
    director: '',
    metascore: '',
    stars: [],
  }

const UpdateMovie = props => {
    console.log(props)

    const [movie, setMovie] = useState(initialState)

    const handleChange = e => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const submitForm = () => {
        axios.put('localhost:5000/api/movies/:id')
    }

    return(
        <div>
           <form onSubmit={submitForm}>
                <input
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                    value={movie.title}
                />

                <input
                    name="director"
                    placeholder="director"
                    onChange={handleChange}
                    value={movie.director}
                /> 
                
                <input
                    name="metascore"
                    placeholder="metascore"
                    onChange={handleChange}
                    value={movie.metascore}
                />

                <input
                    name="stars"
                    placeholder="stars"
                    onChange={handleChange}
                    value={movie.stars}
                />
                <button> Update </button>
            </form>
        </div>
    )
}

export default UpdateMovie