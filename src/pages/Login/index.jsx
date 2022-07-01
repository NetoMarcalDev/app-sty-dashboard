import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import Header from '../../components/Header';

export default class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            message: this.props.location.state ? this.props.location.state.message : '',
        }
    }

    singIn = () => {

        const data = { description_user: this.description_user, password_user: this.password_user };
        
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };

        fetch('https://fortalcenter.com.br:3001/api/painel/users/login', requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Login inválido!");
            })
            .then(token => {
                localStorage.setItem('token', token);
                this.props.history.push("/admin");
                return;
            })
            .catch(e => {
                this.setState({ message: e.message })
            });

    }

    render() {
        return(
            <div className='col-md-6'>
                <Header title="Login" />
                <hr className='my-3'/>
                {
                    this.state.message !== '' ? (
                        <Alert color='danger'>{ this.state.message }</Alert>
                    ) : ''
                }
                <Form>
                    <FormGroup>
                        <Label for='description_user'>Usuário</Label>
                        <Input type='text' id='description_user' onChange={e => this.description_user = e.target.value } placeholder='Informo o usuário' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password_user'>Senha</Label>
                        <Input type='password' id='password_user' onChange={e => this.password_user = e.target.value } placeholder='Informe a senha' />
                    </FormGroup>
                    <Button color='primary' block onClick={this.singIn}>Entrar </Button>
                </Form>
            </div>
        )
    }
}