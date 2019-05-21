import React from 'react';
import Form from '../form';

const ListItem = user => {
  const { name, lastname, age = 'n/a', email = 'n/a', id } = user;
  const [isEditing, setIsEditing] = React.useState();
  const container = React.useRef();

  React.useEffect(
    () => {
      const handleClick = e => {
        if (!container.current.contains(e.target)) {
          setIsEditing(false);
        }
      };

      const cleanupListener = () => {
        document.removeEventListener('mousedown', handleClick, false);
      };

      if (isEditing) {
        document.addEventListener('mousedown', handleClick, false);
      } else {
        cleanupListener();
      }

      // cleanup for when component unmounts
      return () => {
        cleanupListener();
      };
    }, [isEditing]
  );

  return (
    <li key={ id } ref={ container }>
      <span className="user">{ `${lastname}, ${name}: ${age} (${email})` }</span>
      <button
        className="edit"
        type="button"
        disabled={ isEditing }
        onClick={ () => setIsEditing(true) }
      >
        Edit
      </button>
      {
        isEditing && (
          <Form
            {...user}
          />
        )
      }
    </li>
  );
};

export default ListItem;
