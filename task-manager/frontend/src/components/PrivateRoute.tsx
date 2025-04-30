import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

interface PrivateRouteProps extends RouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth(); 

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
