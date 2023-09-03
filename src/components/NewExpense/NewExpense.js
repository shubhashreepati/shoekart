import React, { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {

  const [isEditing,setIsEditing]= useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  const startEditingHandler=()=>{
    setIsEditing(true);
  };

  const stopEditingHandler=()=>{
    setIsEditing(false);
  };

  return (
    <div className='new-expense'>
      
      {!isEditing &&(
        <button onClick={startEditingHandler}>Add New Expense</button>
   
      )}
      {!isEditing &&(
     
        <button onClick={props.onCloseExpense}>Close</button>
      )}
      {isEditing && (
        <ExpenseForm 
        onSaveExpenseData={saveExpenseDataHandler}
        onCancel={stopEditingHandler}
        onClose={props.onCloseExpense}
        
         />

      )}
      
    </div>
  );
};

export default NewExpense;