
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
import './index.css'

const MainDropdown = () => {
    return (
    <>
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
            <li>
                <i className='fas fa-sign-out-alt'/>
                <p>Log out</p>
            </li>
        </ul>
    </div>


    </>
    )
}

export default MainDropdown
