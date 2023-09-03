import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import { useContext ,  useEffect, useState  } from "react";

import AuthContext from "../../store/auth-context";

const HeaderCartButton = (props) =>{
    const cartCtx=useContext(AuthContext);

    const [btnIsHighlighted,setBtnIsHighlighted]= useState(false);

    const {items} =cartCtx;

    const numberOfCartItems=items.reduce((curNumber,item)=>{

        console.log(curNumber + item.amount);

        return curNumber + item.amount;

    },0);

    const btnClasses = `${classes.button} ${ btnIsHighlighted ? classes.bump: ''}`;

    useEffect(()=>{

        if (items.length === 0) {
            return;
          }
        setBtnIsHighlighted(true);


        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
          }, 300);
      
          return () => {
            clearTimeout(timer);
          };
    },[items]);

    return(
        <button className={btnClasses} onClick={props.onClickOnShowCart} >
            <span  className={classes.icon} >
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );



};


export default HeaderCartButton;