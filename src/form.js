import React from 'react';
import { useValidation , TextInput, DropDown } from './formUtils';

import './app.css';

const validation = {
  name: 'required',
  email: 'required email',
  lastname: 'required',
  age: 'required',
};

export default () => {
  const { data, errors, handleBlur, handleChange, handleSubmit } = useValidation(validation);
  console.log(errors)
  return (
    <form
      onSubmit={ handleSubmit }
    >
      <TextInput
        name="name"
        label="Name"
        handleBlur={ handleBlur }
        handleChange={ handleChange }
        value={ data.name }
        error={ errors.name }
      />
      <TextInput
        name="lastname"
        label="Last name"
        handleBlur={ handleBlur }
        handleChange={ handleChange }
        value={ data.lastname }
        error={ errors.lastname }
      />
      <TextInput
        name="email"
        label="E-mail"
        handleBlur={ handleBlur }
        handleChange={ handleChange }
        value={ data.email }
        error={ errors.email }
      />
      <DropDown
        name="age"
        label="Age"
        handleBlur={ handleBlur }
        handleChange={ handleChange }
        value={ data.email }
        values={ [ '', 19, 20, 21, 22] }
        error={ errors.age }
      />
      <input type="submit"/>
    </form>
  )
}