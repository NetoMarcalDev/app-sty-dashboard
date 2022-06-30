import { Component } from 'react';

export default class LogOut extends Component {

    componentWillMount() {
        localStorage.removeItem('token');
        this.props.history.push('/');
    }
   
    render() {
        return null;
    }
}