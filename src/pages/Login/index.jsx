import React, { Component, createRef } from 'react';
import { Form, FormGroup, Label, Button, Alert } from 'reactstrap';
import { login } from '../../api/User/Login';


export default class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            message: this.props.location.state ? this.props.location.state.message : '',
        }

        this.inputUserRef = createRef();
        this.inputPasswordRef = createRef();
    }

    handleSubmit = async (e) => {

        e.preventDefault(); 

        try {

            const data = { description_user: this.description_user, password_user: this.password_user }; 
            
            if (this.testUserName() && this.testUserPassword()) {
                                
                const resp = await login(data) 

                if (resp.status === 200) {
                  localStorage.setItem('token', resp.data.access_token)
                  localStorage.setItem('description_user', resp.data.user.description_user)
                  this.props.history.push("/admin");
                  return;
                }
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

    testUserName = () => { 
        
        this.setState({ message: ''});

        if(this.description_user ===  undefined){   
            this.inputUserRef.current.focus();         
            this.setState({ message: 'Favor informar o usuário.'});
            return false;
        }
        return true;
    }

    testUserPassword= () => { 
        
        this.setState({ message: ''});

        if(this.password_user === undefined){
            this.inputPasswordRef.current.focus(); 
            this.setState({ message: 'Favor informar a senha.'});
            return false;
        }
        return true;
    }
 
    render() {
        return(
            <div className='col-md-6'>
                <h3>Acessar</h3>
                <hr className='my-3'/>
                {
                    this.state.message !== '' ? (
                        <Alert color='danger'>{ this.state.message }</Alert>
                    ) : ''
                }
                <Form>
                    <FormGroup>
                        <label for='description_user'>Usuário</label>
                        <input type='text' id='description_user' className='form-control'  autoFocus ref={ this.inputUserRef } onChange={e => this.description_user = e.target.value } placeholder='Informe o usuário' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password_user'>Senha</Label>
                        <input type='password' id='password_user' className='form-control' ref={ this.inputPasswordRef } onChange={e => this.password_user = e.target.value } placeholder='Informe a senha' />
                    </FormGroup>
                    <Button color='primary' block onClick={(e) => this.handleSubmit(e)}>Entrar </Button>
                </Form>
            </div>
        )           
    }
}