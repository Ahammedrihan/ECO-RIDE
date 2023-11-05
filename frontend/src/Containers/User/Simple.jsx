import React, { useState } from "react";
import validator from 'validator';

const Simple = () => {
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  console.log("lkjb;fnda;l")

  // Email Validation
  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
        console.log(email)
      setEmailError('Valid Email :)');
    } else {
      setEmailError('Enter valid Email!');
    }
  };

  // Phone Number Validation
  const validatePhone = (e) => {
    var phone = e.target.value;

    if (validator.isMobilePhone(phone, 'any', { strictMode: false })) {
      setPhoneError('Valid Phone Number :)');
    } else {
      setPhoneError('Enter valid Phone Number!');
    }
  };

  return (
    <div style={{ margin: 'auto', marginLeft: '300px' }}>
      <pre>
        <h2>Validating Email with vinojan</h2>
        <span>Enter Email: </span>
        <input 
          type="text" 
          id="userEmail"
          onChange={(e) => validateEmail(e)}
        ></input> <br />
        <span style={{ fontWeight: 'bold', color: 'red' }}>{emailError}</span>
      </pre>
      
      <pre>
        <h2>Validating phone number with vinojan</h2>
        <span>Enter phone: </span>
        <input 
          type="text" 
          id="userPhone"
          onChange={(e) => validatePhone(e)}
        ></input> <br />
        <span style={{ fontWeight: 'bold', color: 'red' }}>{phoneError}</span>
      </pre>
    </div>
  );
}

export default Simple;
