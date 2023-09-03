import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Fragment } from 'react';
import { useState } from 'react';

import Header from './components/Layout/Header';
import Layout from './components/Layout/Layout';
import Meals from './components/Meals/Meals';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import Cart from './components/Cart/Cart';
import NewExpense from './components/NewExpense/NewExpense';
import Expenses from './components/Expenses/Expenses';


const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'Loafers',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    title: 'Ballet Flats',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'Cowboy Boots',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];



function App() {
  const authCtx = useContext(AuthContext);


  const [cartIsShown, setCartIsShown] = useState(false);
  const [showExpense, setShowExpense] = useState(false);

  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);




  const addExpenseHandler = expense => {
    setExpenses(prevExpenses => {       // this is by default feature to automatically get latest snapshot of expense array
      return [expense, ...prevExpenses]
    });

  };

  const showCartHandler = () => {
    setCartIsShown(true);
  }
  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  const showExpenseHandler = () => {

    setShowExpense(true);

  }

  const closeExpenseHandler = () => {
    setShowExpense(false);
  }

  return (
    <Fragment>
      {!authCtx.mealsLoggedIn && <Layout>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path='/auth'>
              <AuthPage />
            </Route>
          )}
          <Route path='/profile'>
            {authCtx.isLoggedIn && <UserProfile />}
            {!authCtx.isLoggedIn && <Redirect to='/auth' />}
          </Route>
          <Route path='/meals'>
            {authCtx.isLoggedIn && <Meals />}
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Layout>}

      {/* { authCtx.mealsLoggedIn &&   cartIsShown && <Cart onHideCart={hideCartHandler} />}
    {authCtx.mealsLoggedIn && <Header onShowCart={showCartHandler} />}
    {authCtx.mealsLoggedIn && <Meals/>} */}


      {authCtx.mealsLoggedIn
        && showExpense && <NewExpense onAddExpense={addExpenseHandler} onCloseExpense={closeExpenseHandler} />}
      {authCtx.mealsLoggedIn
        && showExpense && <Expenses items={expenses} />}

      {authCtx.mealsLoggedIn
        && !showExpense && cartIsShown && <Cart onHideCart={hideCartHandler} />}

      {authCtx.mealsLoggedIn
        && !showExpense && <Header onShowCart={showCartHandler} onShowExpense={showExpenseHandler} />}

      {authCtx.mealsLoggedIn
        &&
        !showExpense && <   Meals />}
    </Fragment>
  );
}

export default App;