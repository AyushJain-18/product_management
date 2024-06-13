import { useState, useEffect } from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import { getHeartBeat } from './utils/api';

function App() {
  useEffect(() => {
    getHeartBeat();
  }, []);
  return 'Hello';
}

export default App;
