import React from 'react';
import UserContext from './context'
import UserList from './userList'

const initUsers = [
  {name: 'A', lastname: 'B', id: 1 },
  {name: 'A2', lastname: 'B2', id: 2 },
  {name: 'A4', lastname: 'B4', id: 3 },
  {name: 'A5', lastname: 'B5', id: 4 },
]
function App() {
  const [users, setUsers] = React.useState(initUsers)
  const updateData = ({ name, lastname, email, id }) => {
    setUsers([
      ...users.map(user => {
        if (user.id === id) {
          return ({ name, lastname, email, id })
        }
        return user
      })
    ])
  }
  return (
    <div className="App">
      <UserContext.Provider
        value={
          {updateData}
        }
      >
        <UserList users={ users } />
     </UserContext.Provider>
    </div>
  );
}

export default App;
