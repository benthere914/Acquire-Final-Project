import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [icon , setIcon] = useState('');
    const [password, setPassword] = useState('');
    const [viewPassword, setViewPassword] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState('');
    const [viewRepeatPassword, setViewRepeatPassword] = useState(false)
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, icon, password));
            if (data) {setErrors(data)}
        }
    };


    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <form onSubmit={onSignUp}>
            <div>{errors.map((error, ind) => (<div key={ind}>{error}</div>))}</div>
            <div>
                <label>Email</label>
                <input type='text' name='email' onChange={(e) => {setEmail(e.target.value)}} value={email}></input>
            </div>
            <div>
                <label>User Name</label>
                <input type='text' name='username' onChange={(e) => {setUsername(e.target.value)}} value={username}></input>
            </div>
            <div>
                <label>Icon</label>
                <input type='text' name='icon' onChange={(e) => {setIcon(e.target.value)}} value={icon}required={true}></input>
            </div>
            <div>
                <label>Password</label>
                <input type={viewPassword?'text':'password'} name='password' onChange={(e) => {setPassword(e.target.value)}} value={password}></input>
                <i className={viewPassword?'fas fa-eye':'fas fa-eye-slash'} onClick={() => {setViewPassword((current) => !current)}}></i>
            </div>
            <div>
                <label>Confirm Password</label>
                <input type={viewRepeatPassword?'text':'password'} name='repeat_password' onChange={(e) => {setRepeatPassword(e.target.value)}} value={repeatPassword} required={true}></input>
                <i className={viewRepeatPassword?'fas fa-eye':'fas fa-eye-slash'} onClick={() => {setViewRepeatPassword((current) => !current)}}></i>

            </div>
            <button type='submit'>Sign Up</button>
        </form>
  );
};

export default SignUpForm;
