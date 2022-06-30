import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index';
import DashboardPage from './pages/Dashbosard/index';
import LogOut from './pages/LogOut/index';

import PrivateRoute from './auth';

//import { AuthProvider } from './contexts/auth';

const AppRoutes = () => {

  return (  
    <Router>
      <Switch>      
        <Route exact path='/' component={ LoginPage } />
        <PrivateRoute path='/admin' component={ DashboardPage } />
        <Route exact path='/logout' component={ LogOut } />
      </Switch>
    </Router>
  );
}

export default AppRoutes;

   