import { Fragment } from 'react';

import mealsImage from '../../assests/shoes5.jpg';

import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import { useContext } from 'react';


import AuthContext from '../../store/auth-context';


const Header= props =>{
  const authCtx = useContext(AuthContext);

  const mealsLogInHandler=()=>{
    authCtx.mealsLogOut();
  }

  return (<Fragment>
        <header className={classes.header}>
        {/* <h1>ReactMeals</h1> */}
        <button onClick={props.onShowExpense} >Expenses</button>
        <HeaderCartButton onClickOnShowCart={props.onShowCart}  />
        <button onClick={mealsLogInHandler} >Back</button>
        

        </header>
        <div className={classes['main-image']} >
            <img src={mealsImage} alt="A tabel full of delicious food" />
        </div>
    </Fragment>
  );



};

export default Header;