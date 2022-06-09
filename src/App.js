import React from 'react';
import MainPage from './components/MainPage/MainPage';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <MainPage />
    </Provider>
  );
}

export default App;
