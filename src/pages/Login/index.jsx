import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import Header from '../../components/Header';
import { login } from '../../api/User/Login';


export default class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            message: this.props.location.state ? this.props.location.state.message : '',
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault(); 

        try {

            const data = { description_user: this.description_user, password_user: this.password_user }; 
            
            const resp = await login(data)  

                if (resp.status === 200) {
                  
                  /*User.default.id_user =  resp.data.user.id_user;
                  User.default.description_user =  resp.data.user.description_user;
                  User.default.access_token =  resp.data.access_token;
                  User.default.token_type =  resp.data.token_type;
                  User.default.expires_in =  resp.data.expires_in;*/
                    
                  localStorage.setItem('token', resp.data.access_token)
                  this.props.history.push("/admin");
                  return;
                }
            }
            
           catch (error) {
                if (error.message === 'Request failed with status code 401') {
                    this.setState({ message: 'Usuário ou senha inválidos.'});
                    return; 
                }          
                this.setState({ message: error.message});          
          }
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
                    <Button color='primary' block onClick={(e) => this.handleSubmit(e)}>Entrar </Button>
                </Form>
            </div>
        )
    }
}