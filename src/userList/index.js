import React from 'react';
import Form from '../form';

import '../app.css';

const UserList = ({ users }) => {
  const [isEditing, setIsEditing] = React.useState()
  return (
    <ul>
      {
        users.map(user => {
          const { name, lastname, age = '-', email = '-', id } = user;
          return (
            <li key={ id }>
              { `${lastname}, ${name}: ${age} (${email})` }
              <button
                type="button"
                onClick={ () => setIsEditing(id) }
              >
                Edit
              </button>
              {
                isEditing === id && (
                  <Form {...user} />
                )
              }
            </li>
          )
        })
      }
    </ul>
  )
}

export default UserList;