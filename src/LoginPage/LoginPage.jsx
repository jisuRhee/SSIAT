import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import './LoginPage.css'

import LoginImage from '../data/_images/login-3.png';
import Logo from '../data/_images/NavBarLogo.png';
import GoogleIcon from '../data/_images/google-icon.png';
import FacebookIcon from '../data/_images/facebook.png';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
function LoginPage() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const { email, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();
    
    const [name, setName] = useState("");
    const [googleEmail, setGoogleEmail] = useState("");


    function responseGoogle(response) {
        setName(response.profileObj.name);
        setGoogleEmail(response.profileObj.googleEmail);
        const { from } = location.state || { from: { pathname: "/" } };
        dispatch(userActions.login(googleEmail, password, from));
        console.log(response);
        console.log(response.profileObj); 
    }

    function responseFacebook(response) {
        console.log(response);
    }

    // to obtain facebook API's 
    // responseFacebook = response => {

    //     this.setState ({
    //         userId: response.userID,
    //         name: response.name,
    //         email: response.email,
    //         picture: response.picture,
    //     });
    // }
    
    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(email, password, from));
        }
    }

    return (
        <div className="login-page">
            {/* left-screen*/}
            <div className="login-left-panel">
                <h2 className='login-title'>?????? ??????????????? ?????? ?????? ???????????????!</h2>
                <div className="login-oauth-group">
                    <GoogleLogin
                        clientId="95964570519-cl08olhuejqb1ouvftprassoatdjkkp7.apps.googleusercontent.com"
                        buttonText="Login"
                        render={renderProps => (
                            <button onClick={renderProps.onClick} className='google-button'>
                                <img src={GoogleIcon} className='google-icon' alt='google'/>
                                <text className='google-text'>?????? ??????????????? ?????????</text>
                            </button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                    <FacebookLogin
                        appId="952434698665843"
                        autoLoad={true}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} className='google-button'>
                                <img src={FacebookIcon} className='google-icon' alt='google'/>
                                <text className='google-text'>?????????????????? ????????????</text>
                            </button>
                        )}
                        callback={responseFacebook} 
                    />
                </div>
                
                <form name="form" onSubmit={handleSubmit}>
                    <div className="form-group" >
                        <label className="login-input-title">????????? ??????</label>
                        <div>
                            <input 
                                placeholder="email address" 
                                type="email" name="email" 
                                value={email} onChange={handleChange} 
                                className={'input-box' + (submitted && !email ? ' is-invalid' : '')} />
                                {submitted && !email &&
                                    <div className="invalid-feedback">Email Address is required</div>
                                }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="login-input-title">????????????</label>
                        <div>
                            <input 
                                    type="password" name="password" 
                                    placeholder='password'
                                    value={password} 
                                    onChange={handleChange} 
                                    className={'input-box' + (submitted && !password ? ' is-invalid' : '')} />
                        </div>

                        {submitted && !password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    
                    <button className="btn login-button">   
                    { loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span> }    
                        ?????????
                    </button>


                    <div> 
                        <text> ?????? ????????? ???????????????? </text>
                        <Link to="/register" className="btn btn-link button-link">?????? ????????????</Link>
                    </div>

                    <div> 
                        <text> ??????????????? ????????? ????????? </text>
                        <a  href="#"> ???????????? ?????? </a>
                    </div>

                   
               

                </form>  
            
            </div>
            {/* right-screen*/}
            <div className="login-right-panel">
                <img src={Logo} alt="logo" className='login-logo' />
                <img src={LoginImage} alt="login" className='login-image'/>
            </div>
            
        </div>
    );
    
}

export { LoginPage };