import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initialState = {
    // id: 5,
    title: '',
    director: '',
    metascore: '',
    stars: [],
  }

const UpdateMovie = props => {
    console.log('props',props)

    // const [movie, setMovie] = useState(initialState)
    const [newmovie, setNewMovie] = useState(initialState)


    // const id = props.match.params.id
    // const movieToUpdate = props.movies.find(movie => {
    //     console.log('id', movie.id, movie)
    //     return `${movie.id}` === id
    // })
    // console.log('movietoupdate',movieToUpdate)



    const {match, movies} = props
    // console.log('props movies', props.movies)
    useEffect(() => {
        console.log('props.movies',movies)
        const id = match.params.id
        const movieToUpdate = movies.find(movie => {
        console.log(movie.id)
        return `${movie.id}` === id
    })
        if (movieToUpdate) {
            console.log(movieToUpdate)
            setNewMovie(movieToUpdate)
        }
    }, [match.params.id, movies])


    const handleChange = e => {
        setNewMovie({...newmovie, [e.target.name]: e.target.value})
    }

    const submitForm = e => {
        e.preventDefault()
        console.log('movie id',newmovie.id)
        axios
            .put(`http://localhost:5000/api/movies/${newmovie.id}`, newmovie)
            .then(res => {
                console.log('submit', res)
                // props.updateMovie(res.data)
                props.history.push(`/movies/${newmovie.id}`)
                setNewMovie(initialState)
            })
            .catch(err => {
                console.log(err)
            })
            
    }

    return(
        <div>
           <form onSubmit={submitForm}>
                <input
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                    value={newmovie.title}
                />

                <input
                    name="director"
                    placeholder="director"
                    onChange={handleChange}
                    value={newmovie.director}
                /> 
                
                <input
                    name="metascore"
                    placeholder="metascore"
                    onChange={handleChange}
                    value={newmovie.metascore}
                />

                {/* <input
                    name="stars"
                    placeholder="stars"
                    onChange={handleChange}
                    value={newmovie.stars}
                /> */}
                {/* <button onClick={() => props.history.push(`/movies/${movie.id}`)}> Update </button> */}
                <button type='submit'> Update </button>
            </form>
        </div>
    )
}

export default UpdateMovie