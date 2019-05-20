import React from 'react';
import Form from './form';
import UserContext from './context'

function App() {
  return (
    <div className="App">
      <UserContext.Provider
        value={
          {
            userData: {
              name: 'Doris', lastname: 'Day', email: 'doris.day@gmail.com', age: 19
            }
          }
        }
      >
        <Form />
      </UserContext.Provider>
    </div>
  );
}

export default App;
