import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './index.css'
const Search = () => {
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 6, 4, 3, 2, 2, 43, 454, 8]
    return (
    <>
        <div className='search'>
            <p>Shop by category</p>
            <i className='fas fa-arrow-down'></i>
            <input type='text' placeholder={'search for anything'}></input>
            <Dropdown options={options} placeholder='select an option'/>
        </div>
    </>
    )
}

export default Search
