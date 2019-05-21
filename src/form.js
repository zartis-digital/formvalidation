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

  const { data, errors, handleChange, handleSubmit, clearFields, canSubmit, handleBlur } = useValidation(validation, user, updateData);

  return (
    <form
      onSubmit={ handleSubmit }
    >
      <TextInput
        name="name"
        label="Name"
        handleChange={ handleChange }
        handleBlur={ handleBlur }
        value={ data.name }
        error={ errors.name }
      />
      <TextInput
        name="lastname"
        label="Last name"
        handleChange={ handleChange }
        handleBlur={ handleBlur }
        value={ data.lastname }
        error={ errors.lastname }
      />
      <TextInput
        name="email"
        label="E-mail"
        handleChange={ handleChange }
        handleBlur={ handleBlur }
        value={ data.email }
        error={ errors.email }
      />
      <DropDown
        name="age"
        label="Age"
        handleChange={ handleChange }
        handleBlur={ handleBlur }
        value={ data.age }
        values={ [ '', 19, 20, 21, 22] }
        error={ errors.age }
      />
      <input type="submit" disabled={ !canSubmit } />
      <button type="button" className="clear" onClick={ clearFields }>Clear fields</button>
    </form>
  );
};
