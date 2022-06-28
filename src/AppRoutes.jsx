import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index';
import HomePage from './pages/Home/index';
import { AuthContext } from './contexts/auth';

const AppRoutes = () => {

  const [user, setUser] = useState(null);

  const login = (email, password) => {
    console.log("login", {email, password});
    setUser({id: 123, email})
  }

  const logout = () => {
    console.log('logout');
  }

  return (
    <main>
      <Switch>
        <AuthContext.Provider 
          value={{ authenticad: !!user, user, login, logout }}
        >
          <Route path='/login' component={ LoginPage } />
          <Route path='/' component={ HomePage } />
        </AuthContext.Provider>
      </Switch>
    </main>
  );
}

export default AppRoutes;

