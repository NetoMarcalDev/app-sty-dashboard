import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './auth';
import LogOut from './pages/LogOut';
import Customer from './pages/Costumer';
import CustomerRegister from './pages/Costumer/Register';
import NotFound from './pages/NotFound';

//import { AuthProvider } from './contexts/auth';

const AppRoutes = () => {

  return (  
    <Router>
      <Switch>      
        <Route exact path="/" component={ Login } />
        <PrivateRoute path="/admin" component={ Dashboard } />
        <Route exact path="/logout" component={ LogOut } />
        <Route exact path="/clients" component={ Customer } />
        <Route exact path="/clients/register" component={ CustomerRegister } />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default AppRoutes;
 
   