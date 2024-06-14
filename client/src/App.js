import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from './hooks/useAppcontext';
import './App.css';
import SingInLandingCopmonent from './pages/sign-in/sign-in.page';
import Spinner from './component/custumComponents/spinner/spinner.component';
import Header from './component/header/header.component';
import Homepage from './pages/home/home.Page';
import CreateProductPage from './pages/createProduct/createProduct.page';
import PrivateRoute from './component/privaeRoute/privateRoute';
import CreateUser from './pages/createUser/createUser.page';

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
          <Routes>
            <Route path="/signup" element={<SingInLandingCopmonent />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/create-product" element={<CreateProductPage />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/product/edit" element={<CreateProductPage />} />
            </Route>
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
