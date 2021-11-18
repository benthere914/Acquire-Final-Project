import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewPassword, setViewPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  useEffect(() => {
      setEmailError(errors?.email)
      setPasswordError(errors?.password)
  }, [errors])


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin} className='logInForm'>
            <h2>Log in to continue</h2>
            <p>To purchase an item, or to chat with a seller, please log in to your account</p>
            {/* <div>{errors.map((error, ind) => (<div key={ind}>{error}</div>))}</div> */}
            <div className='formData'>
                <label>Email {emailError}</label>
                <input
                    style={emailError?{border:'solid red 1px'}:null}
                    type='text'
                    name='email'
                    onChange={(e) => {setEmail(e.target.value);setEmailError('')}}
                    value={email}
                    placeholder='Enter your email'>
                </input>
            </div>


            <div className='formData'>
                <label>Password {passwordError}</label>
                <input
                    style={passwordError?{border: 'solid red 1px'}:null}
                    type={viewPassword?'text':'password'}
                    name='password' onChange={(e) => {setPassword(e.target.value);setPasswordError('')}}
                    value={password}
                    placeholder='Create a password'>
                </input>
                <i
                    className={viewPassword?'fas fa-eye':'fas fa-eye-slash'}
                    onClick={() => {setViewPassword((current) => !current)}}>
                </i>
            </div>
            <button type='submit'>Log in</button>
            <button type='button' onClick={() => {dispatch(login('demo@aa.io', 'password'))}}>Log in as the Demo</button>

        </form>
  );
};

export default LoginForm;
