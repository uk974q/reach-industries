import './Login.css'
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDp-W7oleuIFT20J8i-W3W0AnM2epIoDJ0'
    const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDp-W7oleuIFT20J8i-W3W0AnM2epIoDJ0'
    const [newUser,setNewUser] = React.useState(false)
    const [errorMessage, setErrorMessage]  = React.useState('')
    
    function isNewUser(value){
        setNewUser(value)
    }
    function showPassword(){
        if(document.getElementById("password").type === 'password')
            document.getElementById("password").type = 'text'
        else
            document.getElementById("password").type = 'password'
    }
    function checkValid(){
        let isValid = false
        let email = document["loginForm"]["email"].value
        let organization = document["loginForm"]["org"].value
        let password = document["loginForm"]["password"].value
        if(email.length && validateEmail(email) && organization.length && password.length >= 4)
            isValid = true;
        else
            isValid = false

        document.querySelector(".auth-button").toggleAttribute("disabled",!isValid)
    }
    const validateEmail = (email) => {
        return email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    function login(){
        let email = document["loginForm"]["email"].value
        let password = document["loginForm"]["password"].value
        fetch(LOGIN_URL,{
            method:'POST',
            body: JSON.stringify({
                email,
                password,
                returnSectureToken: true
            })
        }).then(res => res.json())
        .then(res => {
            console.log("Res",res)
            if(res.error){
                handleError(res.error.message,"Sign In")
                return;
            }
            navigateHome(res.idToken)
        },err => {
            setErrorMessage(`Error while signing in : ${err}`)
        })

        
    }
    function signUp(){
        // console.log("SignUP")
        let email = document["loginForm"]["email"].value
        let password = document["loginForm"]["password"].value
        fetch(SIGNUP_URL,{
            method:'POST',
            body: JSON.stringify({
                email,
                password,
                returnSectureToken: true
            })
        }).then(res => res.json())
        .then(res => {
            console.log("Res",res)
            if(res.error){
                handleError(res.error.message,"Sign Up")
                return;
            }
            navigateHome(res.idToken)
        },err => {
            setErrorMessage(`Error while signing in : ${err}`)
            
        })

    }

    function navigateHome(idToken){
        sessionStorage.setItem("appIdToken",idToken)
        sessionStorage.setItem("appExpiresIn",Date.now())
        navigate("/home");
    }

    function handleError(errorMessage, action){
        switch(errorMessage){
            case 'EMAIL_EXISTS':
                setErrorMessage("Email already registered!")
                break;
            case 'WEAK_PASSWORD : Password should be at least 6 characters':
                setErrorMessage("Min Length 6 required")
                break;
            case 'EMAIL_NOT_FOUND':
                setErrorMessage("Email not found!")
                break;
            case 'INVALID_PASSWORD':
                setErrorMessage("Invalid password")
                break;
            default:
                setErrorMessage(`Error while ${action} : ${errorMessage}`)
                break;
        }
    }

    return(
        <div className='login-page-container'>
            <form className='form-container' name="loginForm">
                <h1>Reach Industries</h1>
                {!newUser && <a id="newUser" onClick={() => isNewUser(true)}>New User? Click Here</a>}
                {newUser && <a id="signInUser" onClick={()=>isNewUser(false)}>Have account? Login</a>}
                <label htmlFor='email'>Email</label>
                <input type='email' name="email" id="email" required onKeyUp={checkValid}></input>
                <label htmlFor ='org' required>Organization</label>
                <input type='text' name="org" id="org" onKeyUp={checkValid}></input>
                <div className='password-container'>
                    <label htmlFor ="password">Password (Min 6 char)</label>
                    <a id="showPassword" onClick={showPassword}>Show Password</a>
                    <input type='password' name="password" id="password" required onKeyUp={checkValid}></input>
                </div>
            </form>
                <div className='button-group'>
                    {!newUser && <button className='btn auth-button login-button' onClick={login}>Login</button>}
                    {newUser && <button className='btn auth-button signup-button' onClick={signUp}>SignUp</button>}
                </div>
                {errorMessage && <div className='errorInLogin'>{errorMessage}</div>}
                
        </div>
    )
}