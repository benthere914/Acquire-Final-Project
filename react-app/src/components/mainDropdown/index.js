
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
import './index.css'
import { logout, login } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';


const MainDropdown = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const imgErrorHandler = (e) => {
        e.target.onerror = null;
        e.target.src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    }
    return (
    <>
    {user?.username?
    <div className='mainDropDown' style={user?.id === 1?{height: 170}:null}>
        <div className='topOfMainDropDown' onClick={() => {history.push(`/users/${user?.id}`)}}>
            <img
                className='userPhoto'
                src={user?.icon}
                alt='username'
                onError={(e) => {imgErrorHandler(e)}}

                />
            <div>
                <p>{user?.username}</p>
                <p>See your profile</p>
            </div>
        </div>
        <ul>
            <li onClick={() => {history.push('/items/new')}}>
                <i className='fas fa-plus'/>
                <p>List a new product</p>
            </li>
            {user?.id !== 1?
            <li onClick={() => {history.push(`/users/${user?.id}/edit`)}}>
                <i className='fas fa-cog'/>
                <p>Edit your account</p>
            </li>
            :null}
            <li onClick={() => {history.push('messages')}}>
                <i className='fas fa-comment-dots'/>
                <p>messages</p>
            </li>
            <li onClick={() => {dispatch(logout()); history.push('/')}}>
                <i className='fas fa-sign-out-alt'/>
                <p>Log out</p>
            </li>
        </ul>
    </div>:
    <div className='mainDropDown' style={{height: 72, width: 125}}>
        <ul>
            <li style={{borderTopLeftRadius: 22, borderTopRightRadius: 22}} onClick={() => {history.push('sign-up')}}>
                <i className='fas fa-plus'/>
                <p>Sign Up</p>
            </li>
            <li onClick={() => {history.push('/login')}}>
                <i className='fas fa-cog'/>
                <p>Log In</p>
            </li>
            <li style={{borderBottomLeftRadius: 22, borderBottomRightRadius: 22}} onClick={() => {dispatch(login('demo@aa.io', 'password'))}}>
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
