import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signUpForm.css'

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [icon , setIcon] = useState('');
    const [password, setPassword] = useState('');
    const [viewPassword, setViewPassword] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState('');
    const [viewRepeatPassword, setViewRepeatPassword] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [userNameError, setUserNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [repeatPasswordError, setRepeatPasswordError] = useState('')
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, icon, password));
            if (data) {setErrors(data); console.log(errors)}
        }
        else{
            setRepeatPasswordError(' - Password does not match')
        }
    };
    useEffect(() => {
        setEmailError(errors?.email)
        setUserNameError(errors?.username)
        setPasswordError(errors?.password)

    }, [errors])
    const imgErrorHandler = (e) => {
        e.target.onerror = null;
        e.target.src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    }
    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <>
            <form onSubmit={onSignUp} className='signUpForm'>
                <h2>Sign up to continue</h2>
                <p>To purchase an item, or to chat with a seller, please create your account</p>
                <img
                    src={icon?icon:'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'}
                    alt='user Icon'
                    onError={(e) => {imgErrorHandler(e)}}
                />
                {/* <div>{errors.map((error, ind) => (<div key={ind}>{error}</div>))}</div> */}
                <div className='formData'>
                    <label>Email {emailError?emailError:null}</label>
                    <input
                        style={emailError?{border: 'solid red 1px'}:null}
                        type='text'
                        name='email'
                        onChange={(e) => {setEmail(e.target.value);setEmailError('')}}
                        value={email}
                        placeholder='Enter your email'
                        // required={true}
                        >

                    </input>
                </div>
                <div className='formData'>
                    <label>User Name {userNameError?userNameError:null}</label>
                    <input
                        style={userNameError?{border: 'solid red 1px'}:null}
                        type='text'
                        name='username'
                        onChange={(e) => {setUsername(e.target.value);setUserNameError('')}}
                        value={username}
                        placeholder='Create your username'
                        >
                    </input>
                </div>
                <div className='formData'>
                    <label>Icon - optional</label>
                    <input
                        type='text'
                        name='icon'
                        onChange={(e) => {setIcon(e.target.value)}}
                        value={icon}
                        placeholder='Enter your photo url'>
                    </input>
                    <p>Image changes upon valid url</p>
                </div>
                <div className='formData'>
                    <label>Password {passwordError?passwordError:null}</label>
                    <input
                        style={passwordError?{border: 'solid red 1px'}:null}
                        type={viewPassword?'text':'password'}
                        name='password' onChange={(e) => {setPassword(e.target.value);setPasswordError('')}}
                        value={password}
                        placeholder='Create a password'
                        >
                    </input>
                    <i
                        className={viewPassword?'fas fa-eye':'fas fa-eye-slash'}
                        onClick={() => {setViewPassword((current) => !current)}}>
                    </i>
                </div>
                <div className='formData'>
                    <label>Confirm Password {repeatPasswordError?repeatPasswordError:null}</label>
                    <input
                        style={repeatPasswordError?{border: 'solid red 1px'}:null}
                        type={viewRepeatPassword?'text':'password'}
                        name='repeat_password'
                        onChange={(e) => {setRepeatPassword(e.target.value);setRepeatPasswordError('')}}
                        value={repeatPassword}

                        placeholder='Confirm your password'
                        >
                    </input>
                    <i
                        className={viewRepeatPassword?'fas fa-eye':'fas fa-eye-slash'}
                        onClick={() => {setViewRepeatPassword((current) => !current)}}>
                    </i>
                </div>
                <button style={{height: 500}} className='signUpButton' type='submit'>Sign Up</button>
            </form>

        </>
  );
};

export default SignUpForm;
