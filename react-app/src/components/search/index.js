import Dropdown from 'react-dropdown';
import { useHistory } from 'react-router';
import 'react-dropdown/style.css';
import './index.css'
import { useState } from 'react';
import { useEffect } from 'react';
const Search = () => {
    const history = useHistory()
    const options = [
        'All Categories',
        'Antiques',
        'Art',
        'Baby',
        'Books',
        'Cameras & Photo',
        'Clothing, & Shoes',
        'Collectibles',
        'Computers & Tables',
        'Electronics',
        'Crafts',
        'Dolls & Bears',
        'DVDs & Movies',
        'Entertainment Misc',
        'Gift Cards',
        'Health & Beauty',
        'Home & Garden',
        'Jewely & Watches',
        'Music',
        'Musical Instruments',
        'Pet Supplies',
        'Pottery & Glass',
        'Sporting Goods',
        'Sports Memorabillia',
        'Stamps',
        'Toys & hobbies',
        'Travel',
        'Video Games',
        'Everything Else'
    ]
    const [searchText, setSearchText] = useState('')
    const searchHandler = () => {
        history.push(`/search/${searchText.split('%').join("%25").split(" ").join("%20")}`)
        setSearchText('')
    }

      return (
    <>
        <div className='search'>
            <div className='categoryModalButton'>
                <p>Random Search</p>
                <i className='fas fa-arrow-down'></i>
            </div>
            <input value={searchText} onChange={(e) => {setSearchText(e.target.value);}} type='text' placeholder={'search for anything'}></input>
            <Dropdown options={options} placeholder='select an option'/>
        </div>
            <h3
                onClick={() => {searchHandler()}}
                className='searchButton'>Search</h3>
    </>
    )
}

export default Search
