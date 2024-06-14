import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './hooks/useAppcontext';
import './App.css';
import SingInLandingCopmonent from './pages/sign-in/sign-in.page';
import Spinner from './component/custumComponents/spinner/spinner.component';
import Header from './component/header/header.component';
import Homepage from './pages/home/homePage';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [loggedInUserRole, setLoggedInUserRole] = useState(null);

  useEffect(() => {
    if (token === null) {
      setLoggedInUserRole(null);
    }
  }, [token]);
  const value = {
    isLoading,
    setIsLoading,
    token,
    setToken,
    loggedInUserRole,
    setLoggedInUserRole,
  };
  return (
    <BrowserRouter>
      <Provider value={value}>
        {isLoading && <Spinner />}
        <Header />
        <div className="main-container">
          {!token && <SingInLandingCopmonent />}
          {token && <Homepage />}
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
