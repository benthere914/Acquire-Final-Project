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
        'Business & Industrial',
        'Cameras & Photo',
        'Clothing, Shoes, & Accessories',
        'Coins & Paper Money',
        'Collectibles',
        'Computers/Tablets & Networking',
        'Consumer Electronics',
        'Crafts',
        'Dolls & Bears',
        'DVDs & Movies',
        'Entertainment Memorabillia',
        'Gift Cards & Coupons',
        'Health & Beauty',
        'Home & Garden',
        'Jewely & Watches',
        'Music',
        'Musical Instruments & Gear',
        'Pet Supplies',
        'Pottery & Glass',
        'Sporting Goods',
        'Sports Memorabillia',
        'Stamps',
        'Tickets & Experiences',
        'Toys & hobbies',
        'Travel',
        'Video Games & Consoles',
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
