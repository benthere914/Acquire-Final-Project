import './index.css'
import Dropdown from 'react-dropdown';
import { useSelector } from "react-redux"
import { useState } from "react"
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router';
import BetterImage from '../betterImage';
const NewProductPage = () => {
    const history = useHistory()
    const imgErrorHandler = (e) => {
        e.target.onerror = null;
        e.target.src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    }
    const userId = useSelector(state => state.session.user.id)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [condition, setCondition] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [description, setDescription] = useState('')
    const [icon1, setIcon1] = useState('')
    const [icon2, setIcon2] = useState('')
    const [icon3, setIcon3] = useState('')
    const [img1Error, setImg1Error] = useState(false)
    const [viewImg1Error, setViewImg1Error] = useState(false)
    const [img2Error, setImg2Error] = useState(false)
    const [viewImg2Error, setViewImg2Error] = useState(false)
    const [img3Error, setImg3Error] = useState(false)
    const [viewImg3Error, setViewImg3Error] = useState(false)
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

    const publishHandler = async (e) => {
        e.preventDefault()
        if (img1Error || img2Error || img3Error){
            if (img1Error){setViewImg1Error(true)}
            if (img2Error){setViewImg2Error(true)}
            if (img3Error){setViewImg3Error(true)}
            return
        }
        const response = await fetch(`/api/items/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                title,
                price,
                category,
                condition,
                description,
                quantity,
                icon1,
                icon2,
                icon3
            }),
          });
            if (response.ok) {
                await response.json().then((e) => {history.push(`/items/${e['id']}`)})
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
                <input type='text' value={description} onChange={(e) => {setDescription(e.target.value)}}></input>
                <p>Count</p>
                <input type='number' value={quantity} onChange={(e) => {setQuantity(e.target.value)}} default={1} min={1}/>
                <p>Photo Url {viewImg1Error?' - Invalid Image Icon':null}</p>
                <input style={viewImg1Error?{border: 'solid red 2px'}: null}  type='text' value={icon1} onChange={(e) => {setViewImg1Error(false);setIcon1(e.target.value)}}></input>
                <p>Photo Url {viewImg2Error?' - Invalid Image Icon':null}</p>
                <input style={viewImg2Error?{border: 'solid red 2px'}: null}  type='text' value={icon2} onChange={(e) => {setViewImg2Error(false);setIcon2(e.target.value)}}></input>
                <p>Photo Url {viewImg3Error?' - Invalid Image Icon':null}</p>
                <input style={viewImg3Error?{border: 'solid red 2px'}: null} type='text' value={icon3} onChange={(e) => {setViewImg3Error(false);setIcon3(e.target.value)}}></input>
                <button type={'submit'}>Publish</button>
                </form>
            </div>
            <div className='publishPreview'>
                <p>{title || 'Example'}</p>
                    <Carousel>
                            <img
                            alt='item for sale'
                            className='previewImg'
                            src={icon1}
                            onError={(e) => {imgErrorHandler(e)}}
                            />
                            <img
                            alt='item for sale'
                            className='previewImg'
                            src={icon2}
                            onError={(e) => {imgErrorHandler(e)}}
                            />
                            <img
                            alt='item for sale'
                            className='previewImg'
                            src={icon3}
                            onError={(e) => {imgErrorHandler(e)}}
                            />


                    </Carousel>
                    <BetterImage
                        src={icon1}
                        alt='item for sale'
                        classname='checkImage'
                        setError={setImg1Error}
                    />
                    <BetterImage
                        src={icon2}
                        alt='item for sale'
                        classname='checkImage'
                        setError={setImg2Error}
                    />
                    <BetterImage
                        src={icon3}
                        alt='item for sale'
                        classname='checkImage'
                        setError={setImg3Error}
                    />
                    <div className='bottomPreviewData'>
                        <p>Price: {price || 100}</p>
                        <p>Condition: {condition.value || 'example'}</p>
                        <p>{description || 'example description'}</p>
                    </div>

            </div>
        </div>
    </>
    )
}

export default NewProductPage
