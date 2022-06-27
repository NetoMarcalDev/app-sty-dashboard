import React, { useState } from "react";
import './style.css';
import axios from 'axios';

export default function Login() {

    const userDefault = {
        description_user: '',
        password_user: ''
    } 

    const [user, setUser] = useState(()=> userDefault);

    const handleSetUserDescription = (e) => {
        if(e.target.getAttribute('name')  === 'user-name'){
            setUser({...user, description_user: e.target.value})
        }
    }

    const handleSetUserPassWord = (e) => {
        if(e.target.getAttribute('name')  === 'user-password'){
            setUser({...user, password_user: e.target.value})
        }
    }

    const log = ()=> {
       axios.post('https://localhost:3001/api/painel/clients', user)
            .then(res=>alert(JSON.res))
    }

    
    

    return(
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>SetYdeias®</h3>
                        {/*<div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square"></i></span>
                            <span><i className="fab fa-google-plus-square"></i></span>
                            <span><i className="fab fa-twitter-square"></i></span>
                        </div>*/}
                    </div>
                    <div className="card-body">
                        <section>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input
                                    type="text" 
                                    name='user-name' 
                                    className="form-control" 
                                    placeholder="usuário" 
                                    onChange={(e)=> handleSetUserDescription(e)}
                                />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input 
                                    type="password" 
                                    name='user-password' 
                                    className="form-control" 
                                    placeholder="senha" 
                                    onChange={(e)=> handleSetUserPassWord(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="submit" 
                                    value="Acessar" 
                                    className="btn float-right login_btn"
                                    onClick={()=> log()} 
                                />
                            </div>
                        </section>
                    </div>
                    <div className="card-footer">                        
                        {/*<div className="d-flex justify-content-center links">
                            Don't have an account?<a href="#">Sign Up</a>
                        </div>
                        <div className="d-flex justify-content-center">
                            <a href="#">Forgot your password?</a>
                        </div>*/}
                    </div>
                </div>
            </div>
        </div>        
    )
}

                

               