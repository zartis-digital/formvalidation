import React from 'react';
import Form from '../form';

import '../app.css';

const UserList = ({ users }) => {
  const [isEditing, setIsEditing] = React.useState()
  return (
    <ul>
      {
        users.map(user => {
          const { name, lastname, id } = user;
          return (
            <li key={ id }>
              { `${lastname}, ${name}` }
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