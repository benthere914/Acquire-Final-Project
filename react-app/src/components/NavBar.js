import './navBar.css'
import MainDropdown from './mainDropdown';
import { useHistory } from 'react-router';
import { useState } from 'react';


const NavBar = () => {
    const history = useHistory()
    const [dropDown, setDropdown] = useState(false)
    return (
        <>
            <div className='navbar'>
                <p onClick={() => {history.push('/')}}>Acquire</p>
                <i className='fas fa-bars' onMouseEnter={() => {setDropdown(true)}}></i>
            </div>
            {dropDown?
            <div className='dropDownParent'
                onMouseLeave={() => {setDropdown(false)}}>
                <MainDropdown/>
            </div>:null
            }

        </>
    );
}

export default NavBar;
