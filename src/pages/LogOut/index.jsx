import { Component } from 'react';

export default class LogOut extends Component {

    componentWillMount() {
        localStorage.removeItem('token');
        localStorage.removeItem('description_user');
        this.props.history.push('/');
    }
   
    render() {
        return null;
    }
}