import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuth = () => {
   
    console.log(localStorage.getItem('token'))

    if (localStorage.getItem('token') !== null) {
        return true;
    }   
    return false;
};

const PrivateRoute = ({component: Component, ...rest }) => {
    return (
        <Route 
            {...rest }
            render={ props => 
                isAuth() ? (
                    <Component {...props} />
                ): (
                    <Redirect 
                        to={{
                            pathname: '/',
                            state: { message: 'Usuário não autorizado.' }
                        }}
                    />
                )}
        />
    );
}

export default PrivateRoute;