import React from 'react';
import { useValidation , TextInput, DropDown } from './formUtils';
import UserContext from './context';

import './app.css';

const validation = {
  name: 'required',
  email: 'required email',
  lastname: 'required',
  age: 'required',
};

export default () => {
  const { userData } = React.useContext(UserContext)
  const { data, errors, handleBlur, handleFocus, handleChange, handleSubmit, clearFields } = useValidation(validation, userData);
 console.log(userData)
  return (
    <form
      onSubmit={ handleSubmit }
    >
      <TextInput
        name="name"
        label="Name"
        handleBlur={ handleBlur }
        handleFocus={ handleFocus }
        handleChange={ handleChange }
        value={ data.name }
        error={ errors.name }
      />
      <TextInput
        name="lastname"
        label="Last name"
        handleBlur={ handleBlur }
        handleFocus={ handleFocus }
        handleChange={ handleChange }
        value={ data.lastname }
        error={ errors.lastname }
      />
      <TextInput
        name="email"
        label="E-mail"
        handleBlur={ handleBlur }
        handleFocus={ handleFocus }
        handleChange={ handleChange }
        value={ data.email }
        error={ errors.email }
      />
      <DropDown
        name="age"
        label="Age"
        handleBlur={ handleBlur }
        handleFocus={ handleFocus }
        handleChange={ handleChange }
        value={ data.age }
        values={ [ '', 19, 20, 21, 22] }
        error={ errors.age }
      />
      <input type="submit"/>
      <button type="button" onClick={ clearFields }>Clear fields</button>
    </form>
  )
}