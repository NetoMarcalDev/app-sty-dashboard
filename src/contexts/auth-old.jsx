import React, { createContext, useState } from 'react';
//import CompanySettings from '../globals/CompanySettings';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const login = (email, password) => {
      if (password === '123') {
        console.log("login-on", {email, password});        
        setUser({id: 123, email});
        //window.location.href = `${CompanySettings.config.endpoint}`;
      }
    }
  
    const logout = () => {
      console.log('logout');
      setUser(null);
      //window.location.href = `${CompanySettings.config.endpoint+'/login'}`;
    }

    return(
        <AuthContext.Provider 
        value={{ authenticad: !!user, user, login, logout }}
         >
            { children }
         </AuthContext.Provider>
    )
}