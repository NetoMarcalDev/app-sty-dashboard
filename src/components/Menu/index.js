import React  from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return(
        <nav>
            <h3>Logo</h3>
            <ul>
                <Link to='/admin'>
                   <li>Início</li> 
                </Link>
                <Link to='/clients'>
                    <li>Clientes</li>
                </Link>
                <Link to='/logout'>
                    <li>Sair</li> 
                </Link>
            </ul>
        </nav>
    )
}

export default Menu;