import './navBar.css'
import MainDropdown from './mainDropdown';
import { useHistory } from 'react-router';
import { useState } from 'react';
import Search from './search';

const rightPages = () => {
    return !(
                (window.location.pathname.startsWith('/items/') &&
                    (
                        (window.location.pathname.endsWith('/copy')) ||
                        (window.location.pathname.endsWith('/edit')) ||
                        (window.location.pathname.endsWith('/new'))
                    )
                ) ||
                (window.location.pathname === '/messages')
            )
}

const NavBar = ({setSearchQuery}) => {
    const history = useHistory()
    const [dropDown, setDropdown] = useState(false)

    return (
        <>
            <div className='navbar'>
                <p onClick={() => {history.push('/')}}>Acquire</p>
                {rightPages() && <Search setSearchQuery={setSearchQuery}/>}
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
