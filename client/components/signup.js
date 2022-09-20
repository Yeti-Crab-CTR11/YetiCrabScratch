import React, { useState, useContext, useEffect, Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {UserContext} from '../App';
import APIFunctions from './util/APIfunctions';

// All the standard imports. useNavigate is used to navigate to another node.
// API functions is a document that contains all of our fetch requests.

/**
 * ********************
 * @module SignUp
 * ********************
 **/

const SignUp = () => {

  const navigate = useNavigate();
  const [userId, setUserId] = useContext(UserContext);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // above is our state. userId is important to pass along when the user logs in. 
  // errorMessages display when the user inputs a value that our database does not accept.
  // isSubmitted is not used at the moment, but could be used during iteration.


  const errors = {
    uname: "Please enter a valid username.",
    pass: "Please enter a valid password.",
    email: "Please enter a valid email address.",
    phone: "Please enter a valid country code plus ten-digit phone number in the format: +12345678910"
  };

  const handleSubmit = async (event) => {

    //Prevent page reload
    event.preventDefault();

    const { uname, pass, email, phone } = document.forms[0];

    // console.log(uname.value, pass.value, email.value, phone.value);


    if (uname.value === undefined || typeof uname.value !== 'string') setErrorMessages({ name: "uname", message: errors.uname });
    else if (pass.value === undefined || typeof pass.value !== 'string') setErrorMessages({ name: "pass", message: errors.pass });
    else if (email.value === undefined || typeof email.value !== 'string') setErrorMessages({ name: "email", message: errors.email });
    else if (phone.value === undefined) setErrorMessages({ name: "phone", message: errors.phone });
    
    // this needs a function that converts phone numbers to this format: +12345678910.
    // That is what the Trilio api is expecting.
    
    else {
      const userData = await APIFunctions.createUser(uname.value, pass.value, email.value, phone.value);

      // ^^^ it is important that this is async.

      if (userData) {
        console.log('New User created!');
        setIsSubmitted(true);
        setUserId(userData);
        console.log(userData);
        return navigate('/');
      }
      else console.error('Did not return correct user data from API during CreateUser function in signup');
    }  
  };



  const handleClick = () => {
    return navigate('/login');
  };



  // Generates code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // code for login form
  const renderForm = (

    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Phone Number </label>
          <input type="text" name="phone" required />
          {renderErrorMessage("phone")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        <div className="button-container">
          <div className="login-redirect">Already have an account?</div>
          <input type="button" value="Click Here to Log In." onClick={handleClick}/>
        </div>
      </form>
    </div>

  );


  return (
    <div className="app">
      <div className="signin-form">
        <div className="title">Sign Up</div>
        {renderForm}
      </div>
    </div>
  );

};


export default SignUp;
