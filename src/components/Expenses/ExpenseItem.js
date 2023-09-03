import React, { useState } from 'react';

import ExpenseDate from './ExpenseDate';
import CardE from '../UI/CardE';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  // function clickHandler() {}
  const [title, setTitle] = useState(props.title);
  console.log('ExpenseItem evaluated by React');
  
  const clickHandler = () => {
    setTitle('Updated!');
    console.log(title);
  };

  return (
    <li>
    <CardE className='expense-item'>
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{title}</h2>
        <div className='expense-item__price'>Rs.{props.amount}</div>
      </div>
      {/* <button onClick={clickHandler}>Change Title</button> */}
    </CardE>
    </li>
  );
}

export default ExpenseItem;