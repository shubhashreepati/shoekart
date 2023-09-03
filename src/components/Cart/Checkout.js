import classes from './Checkout.module.css';
import useInput from '../hooks/use-input';


const isEmpty = (value) => value.trim() !== '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
//   const confirmHandler = (event) => {
//     event.preventDefault();
//   };

const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isEmpty);

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetstreet,
  } = useInput(isEmpty);


  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetpostal,
  } = useInput(isFiveChars);


  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetcity,
  } = useInput(isEmpty);

  let formIsValid=false;

  if(firstNameIsValid && streetIsValid && postalIsValid &&  cityIsValid  ){
    formIsValid=true;



  }

  const confirmHandler = event =>{
    event.preventDefault();


    props.onConfirm({
        name: firstNameValue,
        street: streetValue,
        city: cityValue,
        postalCode: postalValue,
    })


    resetFirstName();
    resetstreet();
    resetpostal();
    resetcity();

    if (!formIsValid) {
        return;
      }
  };


  const nameControlClasses = `${classes.control} ${
    !firstNameHasError ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    !streetHasError ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    !postalHasError ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    !cityHasError ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={firstNameValue} onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler} />
        {firstNameHasError && <p ><span color='red' >Please enter a valid name!</span></p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' value={streetValue} onChange={streetChangeHandler} onBlur={streetBlurHandler} />
        {streetHasError  && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' value={postalValue} onChange={postalChangeHandler} onBlur={postalBlurHandler} />
        {postalHasError && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' value={cityValue} onChange={cityChangeHandler} onBlur={cityBlurHandler} />
        {cityHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;