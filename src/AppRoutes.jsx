import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index';
import DashboardPage from './pages/Dashbosard/index';

//import { AuthProvider } from './contexts/auth';

const AppRoutes = () => {

  return (  
    <Router>
      <Switch>      
        <Route exact path='/' component={ LoginPage } />
        <Route path='/dashboard' component={ DashboardPage } />
      </Switch>
    </Router>
  );
}

export default AppRoutes;

   