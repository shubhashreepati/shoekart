import { Fragment } from 'react';
import { useState, useEffect,useCallback } from 'react';

import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './Meals.css';




const Meals = () => {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://aksh-f3364-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMovies=[];

      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
   const response= await fetch('https://aksh-f3364-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data= await response.json();
    console.log(data);
  }

  let content = <p>Found no reviews.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (

    <Fragment>
      {/* <MealsSummary /> */}
     
      <AvailableMeals />

      <section >
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section >
        <button onClick={fetchMoviesHandler}>Show Reviews</button>
      </section>
      <section >{content}</section>


    </Fragment>
  );
};

export default Meals;