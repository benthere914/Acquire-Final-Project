import './index.css'
import UserTag from "../userTag"
import Dropdown from 'react-dropdown';
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { Carousel } from 'react-responsive-carousel';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
import { getItem } from '../../store/selectedItem';
const SellAnotherProductPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const imgErrorHandler = (e) => {
        e.target.onerror = null;
        e.target.src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    }
    const userId = useSelector(state => state.session.user.id)
    const item = useSelector(state => state.selectedItem)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [description, setDescription] = useState('')
    const [icon1, setIcon1] = useState('')
    const [icon2, setIcon2] = useState('')
    const [icon3, setIcon3] = useState('')
    useEffect(() => {
        const itemId = params['itemId']
        dispatch(getItem(itemId))
    }, [params])
    useEffect(() => {
        console.log(item)
        setTitle(item?.name)
        setPrice(item?.price)
        setCategory(item?.category?.name)
        setCondition(item?.condition)
        setDescription(item?.description)
        setQuantity(item?.count)
        setIcon1(item?.photos[0]?.photoUrl)
        setIcon2(item?.photos[1]?.photoUrl)
        setIcon3(item?.photos[2]?.photoUrl)
    }, [item])
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
    useEffect(() => {
        if (typeof category === 'object'){setCategory(category.value)}
        if (typeof condition === 'object'){setCondition(condition.value)}
    }, [condition, category])

    const publishHandler = async (e) => {
        e.preventDefault()
        const response = await fetch(`/api/items/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                title,
                price,
                category: {'value': category},
                condition: {'value': condition},
                description,
                quantity,
                icon1,
                icon2,
                icon3
            }),
          });
            if (response.ok) {
                const item = await response.json().then((e) => {history.push(`/items/${e['id']}`)})
            }

    }
    return (
    <>
        <div className='publishMain'>
            <div className='publishForm'>
                <p>Item For Sale</p>
                {/* <UserTag user={user}/> */}
                <form onSubmit={(e) => {publishHandler(e)}}>
                <p>Title</p>
                <input required={true} type='text' value={title} onChange={(e) => {setTitle(e.target.value)}}></input>
                <p>Price</p>
                <input required={true} type='text' value={price} onChange={(e) => {setPrice(e.target.value)}}></input>
                <p>Category</p>
                <Dropdown options={options} placeholder='select an option' onChange={setCategory} value={category}/>
                <p>Condition</p>
                <Dropdown options={['New', 'Like New','Used', 'Refurbished', 'For Parts or Scrap']} placeholder='select an option' onChange={setCondition} value={condition}/>
                <p>Description</p>
                <input required={true} type='text' value={description} onChange={(e) => {setDescription(e.target.value)}}></input>
                <p>Count</p>
                <input required={true} type='number' value={quantity} onChange={(e) => {setQuantity(e.target.value)}} min={1}/>
                <p>Photo Url</p>
                <input required={true} type='text' value={icon1} onChange={(e) => {setIcon1(e.target.value)}}></input>
                <p>Photo Url</p>
                <input required={true} type='text' value={icon2} onChange={(e) => {setIcon2(e.target.value)}}></input>
                <p>Photo Url</p>
                <input required={true} type='text' value={icon3} onChange={(e) => {setIcon3(e.target.value)}}></input>
                <button type={'submit'}>Publish</button>
                </form>
            </div>
            <div className='publishPreview'>
                <p>{title || 'Example'}</p>
                    <Carousel>
                            <img
                            className='previewImg'
                            src={icon1}
                            onError={(e) => {imgErrorHandler(e)}}
                            />
                            <img
                            className='previewImg'
                            src={icon2}
                            onError={(e) => {imgErrorHandler(e)}}
                            />
                            <img
                            className='previewImg'
                            src={icon3}
                            onError={(e) => {imgErrorHandler(e)}}
                            />

                    </Carousel>
                    <div className='bottomPreviewData'>
                        <p>Price: {price || 100}</p>
                        <p>Condition: {condition?.value || 'example'}</p>
                        <p>{description || 'example description'}</p>
                    </div>

            </div>
        </div>
    </>
    )
}

export default SellAnotherProductPage
