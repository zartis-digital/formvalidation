import React from 'react';
import '../app.css';

export default ({ name, handleChange, value, error, values, label }) => (
  <label
    htmlFor = { name }
  >
    { label }: 
    <select
      onChange={ handleChange }
      value={ value }
      name={ name }
    >
      {
        values.map(e => (
          <option key={ e }>{ e }</option>
        ))
      }
    </select>
    { error && (<p className="errorMsg">{ error }</p>) }
  </label>
)