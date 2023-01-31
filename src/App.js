import './App.css';
import { getMovieList, searchMovie} from './api'
import { useEffect, useState } from 'react';

const App = () => {
  const [topRatedMovie, setTopRatedMovie] = useState ([])

  useEffect (() => {
    getMovieList().then((result) => {
      setTopRatedMovie(result)
    })
  }, [])

  const MovieList = () => {
    return topRatedMovie.map((movie, i) => {
      return (
          <div className="Movie-wrapper" key={i}>
            <div className="Movie-title">{movie.title}</div>
            <img className="Movie-image" alt='' src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
            <div className='Movie-release'>Release :</div>
            <div className="Movie-date">{movie.release_date}</div>
            <div className="Movie-rate">{movie.vote_average}</div>
          </div>
      )
    })
  }

  const search = async (q) => {
    if(q.length > 3) {
      const query = await searchMovie(q)
      setTopRatedMovie(query.results)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Anjay Movie</h1>
          <input type="text" placeholder='cari film kesayangan' className='Movie-search' onChange={({target}) => search(target.value) }/>
        <div className="Movie-container">
          <MovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
