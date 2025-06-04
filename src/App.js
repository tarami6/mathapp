import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import MissingNumberGame from './games/missingNumber/MissingNumberGame';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <MissingNumberGame />
      </div>
    </Provider>
  );
};

export default App;
