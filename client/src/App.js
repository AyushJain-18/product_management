import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getHeartBeat } from './utils/api';
import { Provider } from './hooks/useAppcontext';
import './App.css';
import SingInLandingCopmonent from './pages/sign-in/sign-in.page';

function App() {
  useEffect(() => {
    getHeartBeat();
  }, []);
  const value = {};
  return (
    <Provider value={value}>
      <BrowserRouter>
        <SingInLandingCopmonent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
