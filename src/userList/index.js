import React from 'react';
import Form from '../form';

import '../app.css';

const UserList = ({ users }) => {
  const [isEditing, setIsEditing] = React.useState()
  const form = React.useRef();

  React.useLayoutEffect(() => {
    if (form.current) {
      const height = form.current.clientHeight;
      console.log(height)
      form.current.style.display = 'none';
      form.current.style.height = '0px';
      form.current.style.display = 'block';
      form.current.style.height = `${height}px`;
    }
  }, [isEditing])

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
                  <div
                    ref={form}
                    className="form"
                  >
                    <Form {...user} />
                  </div>
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