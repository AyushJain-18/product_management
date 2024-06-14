import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAppContext from '../../hooks/useAppcontext';


const PrivateRoute = () => {
   const {token} = useAppContext()
  return token ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoute;