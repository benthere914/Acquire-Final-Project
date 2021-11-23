import './index.css'
import Dropdown from 'react-dropdown';
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { Carousel } from 'react-responsive-carousel';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
import { getItem } from '../../store/selectedItem';
import BetterImage from '../betterImage';

const EditProductPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const imgErrorHandler = (e) => {
        e.target.onerror = null;
        e.target.src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    }
    const userId = useSelector(state => state.session.user.id)
    const item = useSelector(state => state.selectedItem)
    const options = useSelector(state => state.options)
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
    const [loadThumbs, setLoadThumbs] = useState(false)
    const [itemLoaded, setItemLoaded] = useState(false)

    const [titleError, setTitleError] = useState('')
    const [priceError, setPriceError] = useState('')
    const [categoryError, setCategoryError] = useState('')
    const [conditionError, setConditionError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [quantityError, setQuantityError] = useState('')
    const [categoryClass, setCategoryClass] = useState('')
    const [conditionClass, setConditionClass] = useState('')

    useEffect(() => {
        setCategoryClass('')
        setCategoryError('')
    }, [category])

    useEffect(() => {
        setConditionClass('')
        setConditionError('')
    }, [condition])

    useEffect(() => {
        const itemId = params['itemId']
        dispatch(getItem(itemId)).then(() => {setItemLoaded(true)})

    }, [params])
    useEffect(() => {
        if (itemLoaded){
            setTitle(item?.name)
            setPrice(item?.price)
            setCategory(item?.category?.name)
            setCondition(item?.condition)
            setDescription(item?.description)
            setQuantity(item?.count)
            setIcon1(item?.photos[0]?.photoUrl)
            setIcon2(item?.photos[1]?.photoUrl)
            setIcon3(item?.photos[2]?.photoUrl)
            setLoadThumbs(true)
            setItemLoaded(false)
        }
    }, [item, itemLoaded])

    useEffect(() => {
        if (typeof category === 'object'){setCategory(category.value)}
        if (typeof condition === 'object'){setCondition(condition.value)}
    }, [condition, category])

    const publishHandler = async (e) => {
        e.preventDefault()
        if (img1Error || img2Error || img3Error){
            if (img1Error){setViewImg1Error(true)}
            if (img2Error){setViewImg2Error(true)}
            if (img3Error){setViewImg3Error(true)}
            return
        }
        const response = await fetch(`/api/items/`, {
            method: 'PUT',
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
                icon3,
                id: params['itemId'],
                photo1Id: item?.photos[0].id,
                photo2Id: item?.photos[1].id,
                photo3Id: item?.photos[2].id,
            }),
          });
            if (response.ok) {
                await response.json().then((e) => {history.push(`/items/${e['id']}`)})
            }
            else{
                const result = await response.json()
                console.log('bad data')
                setTitleError(result?.title)
                setPriceError(result?.price)
                setDescriptionError(result?.description)
                setQuantityError(result?.quantity)
                setCategoryError(result?.category)
                setConditionError(result?.condition)
                if (result?.condition){
                    setConditionClass('badDropDown')
                }
                if (result?.category){
                    setCategoryClass('badDropDown')
                }
            }

    }
    return (
    <>
        <div className='publishMain'>
            <div className='publishForm'>
                <p>Item For Sale</p>
                {/* <UserTag user={user}/> */}
                <form onSubmit={(e) => {publishHandler(e)}}>
                <p>Title {titleError}</p>
                <input
                    required={true}
                    type='text'
                    value={title}
                    onChange={(e) => {setTitle(e.target.value); setTitleError('')}}
                    style={titleError?{border: 'solid red 1px'}: null}>
                </input>
                <p>Price {priceError}</p>
                <input
                    required={true}
                    type='number'
                    value={price}
                    min={0} max={5000}
                    onChange={(e) => {setPrice(e.target.value); setPriceError('')}}
                    style={priceError?{border: 'solid red 1px'}: null}>
                </input>
                <p>Category {categoryError}</p>
                <Dropdown
                    options={options}
                    placeholder='select an option'
                    onChange={setCategory}
                    value={category}
                    controlClassName={categoryClass}
                />
                <p>Condition {conditionError}</p>
                <Dropdown
                    options={['New', 'Like New','Used', 'Refurbished', 'For Parts or Scrap']}
                    placeholder='select an option'
                    onChange={setCondition}
                    value={condition}
                    controlClassName={conditionClass}
                />
                <p>Description <span style={{fontSize: 22}}>{descriptionError}</span></p>
                <input
                    type='text'
                    value={description}
                    onChange={(e) => {setDescription(e.target.value); setDescriptionError('')}}
                    style={descriptionError?{border: 'solid red 1px'}: null}>
                </input>
                <p>Count {quantityError}</p>
                <input
                    type='number'
                    value={quantity}
                    onChange={(e) => {setQuantity(e.target.value); setQuantityError('')}}
                    default={1}
                    min={1}
                    max={20}
                    style={quantityError?{border: 'solid red 1px'}: null}>
                </input>
                <p>Photo Url {viewImg1Error?' - Invalid Image Icon':null}</p>
                <input
                    style={viewImg1Error?{border: 'solid red 2px'}: null}
                    type='text' value={icon1}
                    onChange={(e) => {setViewImg1Error(false);setIcon1(e.target.value)}}>
                </input>
                <p>Photo Url {viewImg2Error?' - Invalid Image Icon':null}</p>
                <input
                    style={viewImg2Error?{border: 'solid red 2px'}: null}
                    type='text'
                    value={icon2}
                    onChange={(e) => {setViewImg2Error(false);setIcon2(e.target.value)}}>
                </input>
                <p>Photo Url {viewImg3Error?' - Invalid Image Icon':null}</p>
                <input
                    style={viewImg3Error?{border: 'solid red 2px'}: null}
                    type='text'
                    value={icon3}
                    onChange={(e) => {setViewImg3Error(false);setIcon3(e.target.value)}}>
                </input>
                <button type={'submit'}>Publish</button>
                </form>
            </div>
            <div className='publishPreview'>
                <p>{title || 'Example'}</p>
                    <Carousel showArrows={false} showThumbs={loadThumbs}>
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
                        <p>Condition: {condition?.value || 'example'}</p>
                        <p>{description || 'example description'}</p>
                    </div>

            </div>
        </div>
    </>
    )
}

export default EditProductPage
