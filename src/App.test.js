import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './store/slices/gamesSlice';
import App from './App';

test('renders the game title', () => {
  const store = configureStore({
    reducer: {
      games: gamesReducer
    }
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  const titleElement = screen.getByText(/Numbers 1 to 10/i);
  expect(titleElement).toBeInTheDocument();
});
