import React from 'react';
import UserContext from './context';
import { UserList } from './userList';
import Form from './form';

const initUsers = [
  { name: 'Peter',   lastname: 'Smith',    id: 1, email: 'peter@zartis.com',   age: 21 },
  { name: 'Paul',    lastname: 'Dow',      id: 2, email: 'paul@zartis.com',    age: 20 },
  { name: 'Luke',    lastname: 'Johnson',  id: 3, email: 'luke@zartis.com',    age: 19 },
  { name: 'Matthew', lastname: 'Richards', id: 4, email: 'matthew@zartis.com', age: 21 },
];

function App() {
  const [users, setUsers] = React.useState(initUsers);

  const updateData = ({ name, lastname, email, age, id }) => {
    const index = users.findIndex(
      user => user.id === id
    );
    if (index < 0) {
      setUsers([
        ...users,
        ({ name, lastname, email, age, id: users.length + 1 }) 
      ]);
    } else {
      setUsers([
        ...users.map(user => {
          if (user.id === id) {
            return ({ name, lastname, email, age, id });
          }
          return user;
        })
      ]);
    }
  };
 
  return (
    <div className="App">
      <UserContext.Provider
        value={
          { updateData }
        }
      >
        <UserList users={ users } />
        <Form />
     </UserContext.Provider>
    </div>
  );
}

export default App;
