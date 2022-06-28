import React, { useState, useContext } from "react";
import './style.css';
//import { login } from '../../api/User/Login';
//import User from '../../globals/UserSettings';
import { AuthContext } from '../../contexts/auth';

export default function Login() {

    const userDefault = {
        description_user: '',
        password_user: ''
    } 

    const [user, setUser] = useState(()=> userDefault);

    const { authenticad , login } = useContext(AuthContext)

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

 
   const log = async () => {
    
    try {

      const resp = await login(user);      
      if (resp.status === 200) {
        
        /*User.default.id_user =  resp.data.user.id_user;
        User.default.description_user =  resp.data.user.description_user;
        User.default.access_token =  resp.data.access_token;
        User.default.token_type =  resp.data.token_type;
        User.default.expires_in =  resp.data.expires_in;

        alert(JSON.stringify( User.default )); */      
      }
    } catch (error) {

     console.log(error);      
    }
  }
    
    

    return(
        <div className="background">
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
                    <p>{String(authenticad)}</p>
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
        </div>   
    )
}

                

               