import React from 'react';
import Form from '../form';

const ListItem = user => {
  const { name, lastname, age = 'n/a', email = 'n/a', id } = user;
  const [isEditing, setIsEditing] = React.useState()
  const container = React.useRef()

  React.useEffect(
    () => {
      const handleClick = e => {
        if (!container.current.contains(e.target)) setIsEditing(false)
      }
      if (isEditing) document.addEventListener('mousedown', handleClick, false)
      else document.removeEventListener('mousedown', handleClick, false)
      return () => {
        document.removeEventListener('mousedown', handleClick, false)
      }
    }, [isEditing]
  )

  return (
    <li key={ id } ref={ container }>
      { `${lastname}, ${name}: ${age} (${email})` }
      <button
        type="button"
        disabled={ isEditing }
        onClick={ () => setIsEditing(id) }
      >
        Edit
      </button>
      {
        isEditing === id && (
          <Form
            {...user}
          />
        )
      }
    </li>
  )
}

export default ListItem