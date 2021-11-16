
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
import './index.css'
import { logout } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';


const MainDropdown = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    console.log(user)
    return (
    <>
    {user?.username?
    <div className='mainDropDown'>
        <div className='topOfMainDropDown'>
            <img className='userPhoto' src='https://secure.gravatar.com/avatar/5c88f00c5c666cf560ecf0a704b84e35?secure=true&size=300' alt='username'/>
            <div>
                <p>username</p>
                <p>See your profile</p>
            </div>
        </div>
        <ul>
            <li>
                <i className='fas fa-plus'/>
                <p>List a new product</p>
            </li>
            <li>
                <i className='fas fa-cog'/>
                <p>Edit your account</p>
            </li>
            <li>
                <i className='fas fa-comment-dots'/>
                <p>messages</p>
            </li>
            <li onClick={() => {dispatch(logout())}}>
                <i className='fas fa-sign-out-alt'/>
                <p>Log out</p>
            </li>
        </ul>
    </div>:
    <div className='mainDropDown' style={{height: 72, width: 125}}>
        <ul>
            <li style={{borderTopLeftRadius: 22, borderTopRightRadius: 22}}>
                <i className='fas fa-plus'/>
                <p>Sign Up</p>
            </li>
            <li>
                <i className='fas fa-cog'/>
                <p>Log In</p>
            </li>
            <li style={{borderBottomLeftRadius: 22, borderBottomRightRadius: 22}}>
                <i className='fas fa-comment-dots'/>
                <p>Demo</p>
            </li>
        </ul>
    </div>
    }


    </>
    )
}

export default MainDropdown
