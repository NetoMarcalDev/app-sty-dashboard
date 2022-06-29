import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index';
import HomePage from './pages/Home/index';

import { AuthProvider } from './contexts/auth';

const AppRoutes = () => {

  return (
    <main>      
      <AuthProvider>
        <Switch>      
          <Route path='/login' component={ LoginPage } />
          <Route path='/' component={ HomePage } />
        </Switch>
      </AuthProvider>
    </main>
  );
}

export default AppRoutes;

   