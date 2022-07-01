import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

export default class Dashboard extends Component {

    render() {
        return(
            <div>
                <Header title='Dashboard' />
                <hr className="my-3"/>
                <Link to="/logout" className="btn btn-outline-primary">SAIR</Link>
            </div>
        )
    }
}