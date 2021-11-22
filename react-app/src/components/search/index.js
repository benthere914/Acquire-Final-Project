import Dropdown from 'react-dropdown';
import { useHistory } from 'react-router';
import 'react-dropdown/style.css';
import './index.css'
import { useState } from 'react';
import { useEffect } from 'react';
const Search = () => {
    const history = useHistory()
    const [option, setOption] = useState('All Categories')
    const options = [
        'All Categories',
        'Antiques',
        'Books',
        'Cameras & Photo',
        'Clothing, & Shoes',
        'Collectibles',
        'Computers & Tables',
        'phones and accessories',
        'Electronics',
        'Musical Instruments',
        'Pet Supplies',
        'Sporting Goods',
        'Toys & hobbies',
        'Game Consoles'
    ]

    const [searchText, setSearchText] = useState('')
    const optionHandler = (option) => {
        if (typeof option === 'string'){
            return option
        }else if (typeof option === 'object'){
            return option.value
        }
    }
    const searchHandler = () => {
        if (searchText === ''){
            history.push(`/search/${optionHandler(option).split('%').join("%25").split(" ").join("%20")}/`)
        }else{
            history.push(`/search/${optionHandler(option).split('%').join("%25").split(" ").join("%20")}/${searchText.split('%').join("%25").split(" ").join("%20")}`)
        }
            setSearchText('')
            setOption('All Categories')
    }

      return (
    <>
        <div className='search'>
            {/* <div className='categoryModalButton'>
                <p>Random Search</p>
                <i className='fas fa-arrow-down'></i>
            </div> */}
            <input value={searchText} onChange={(e) => {setSearchText(e.target.value);}} type='text' placeholder={'search for anything'}></input>
            <Dropdown options={options} value={option} onChange={setOption} placeholder='select an option'/>
        </div>
            <h3
                onClick={() => {searchHandler()}}
                className='searchButton'>Search</h3>
    </>
    )
}

export default Search
