import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const sortMeals = (meals, ascending) => {
  return meals.sort((mealA, mealB) => {
    if (ascending) {
      return mealA.price > mealB.price ? 1 : -1;
    } else {
      return mealA.price < mealB.price ? 1 : -1;
    }
  });
};

const AvailableMeals = () => {
  const history = useHistory();
  const location = useLocation();
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://aksh-f3364-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  // const mealsList = meals.map((meal) => (
  //   <MealItem
  //     key={meal.id}
  //     id={meal.id}
  //     name={meal.name}
  //     description={meal.description}
  //     price={meal.price}
  //   />
  // ));

  // const history = useHistory();
  // const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('sort') === 'asc';

  const sortedMeals= sortMeals(meals, isSortingAscending);

  const changeSortingHandler = () => {
    history.push('/quotes?sort=' + (isSortingAscending ? 'desc' : 'asc'));
  };


  const mealsList = sortedMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <Fragment>
    <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
           {isSortingAscending ? 'High on Quality' : 'Budget friendly'}
        </button>
      </div>
    
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
    </Fragment>
  );
};

export default AvailableMeals;