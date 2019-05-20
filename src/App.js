import React from 'react';
import UserContext from './context'
import UserList from './userList'

const users = [
  {name: 'A', lastname: 'B', id: 1 },
  {name: 'A2', lastname: 'B2', id: 2 },
  {name: 'A4', lastname: 'B4', id: 3 },
  {name: 'A5', lastname: 'B5', id: 4 },
]
function App() {
  return (
    <div className="App">
      <UserContext.Provider
        value={
          {
            userData: {
              name: 'Doris',
              lastname: 'Day',
              email: 'doris.day@gmail.com',
              age: 19
            }
          }
        }
      >
        <UserList users={ users } />
     </UserContext.Provider>
    </div>
  );
}

export default App;
