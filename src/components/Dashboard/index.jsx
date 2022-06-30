import React from 'react';
import { Link } from 'react-router-dom';


export default function Dashboard(props) {

    return(
        <>
            <h2>Dashboard</h2>
            <p>Usuário logado: { props.user.description_user }</p>
            <Link to='/logout'>Sair</Link>
        </>
    )
}