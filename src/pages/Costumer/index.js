import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';

const Customer = () => { 

    return(
        <>
            <Menu />
            <Link to='/clients/register' >+NOVO </Link>    
        </>
    )
}

export default Customer;