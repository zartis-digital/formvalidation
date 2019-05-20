import React from 'react';
import { useValidation , TextInput, DropDown } from './formUtils';
import UserContext from './context';

import './app.css';

const validation = {
  name: 'required',
  email: 'email',
  lastname: 'required',
};

export default (user) => {
  const { updateData } = React.useContext(UserContext);
  const { data, errors, handleChange, handleSubmit, clearFields } = useValidation(validation, user, updateData);
  return (
    <form
      onSubmit={ handleSubmit }
    >
      <TextInput
        name="name"
        label="Name"
        handleChange={ handleChange }
        value={ data.name }
        error={ errors.name }
      />
      <TextInput
        name="lastname"
        label="Last name"
        handleChange={ handleChange }
        value={ data.lastname }
        error={ errors.lastname }
      />
      <TextInput
        name="email"
        label="E-mail"
        handleChange={ handleChange }
        value={ data.email }
        error={ errors.email }
      />
      <DropDown
        name="age"
        label="Age"
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
