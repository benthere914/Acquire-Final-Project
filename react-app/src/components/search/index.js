import { useState } from 'react';
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import './index.css'
const Search = () => {

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
      return (
    <>
        <div className='search'>
            <div className='categoryModalButton'>
                <p>Random Search</p>
                <i className='fas fa-arrow-down'></i>
            </div>
            <input type='text' placeholder={'search for anything'}></input>
            <Dropdown options={options} placeholder='select an option'/>
        </div>

    </>
    )
}

export default Search
