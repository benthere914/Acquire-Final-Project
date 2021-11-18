import './index.css'
import { Carousel } from 'react-responsive-carousel';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../../store/selectedItem';
import UserTag from '../userTag';
import { useState } from 'react';
const ProductPage = () => {
    const history = useHistory()
    const imgErrorHandler = (e) => {
        e.target.onerror = null;
        e.target.src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    }
    const params = useParams()
    const dispatch = useDispatch()
    const item = useSelector(state => state.selectedItem)
    const photos = useSelector(state => state.selectedItem.photos)
    const user = useSelector(state => state.session.user)
    useEffect(() => {
        if (params?.itemId){
            const itemId = params?.itemId
            dispatch(getItem(itemId))
        }
    }, [])
    useEffect(() => {
        console.log(photos)
    },[photos])
    return (
    <>
        <div className='itemMainDiv'>
            <div className='itemTopDiv'>
                <div className='itemTopLeftDiv'>
                    <Carousel infiniteLoop={true}>

                            {photos?.map((photo) => (
                            <img
                                src={photo?.photoUrl}
                                onError={(e) => {imgErrorHandler(e)}}
                            >

                            </img>))}

                    </Carousel>
                </div>
                <div className='itemTopRightDiv'>
                    <p className='itemName'>{item?.name}</p>
                    <UserTag user={item?.seller} extraText={'Sold by'} extraFontSize={25} extraFontWeight={600}/>
                    <div className='conditions'>
                        <p>Condition: </p>
                        <p className='condition'>{item?.condition}</p>
                    </div>
                    <div className='counts'>
                        <p>Quantity:</p>
                        <p className='count'>{item?.count}</p>
                    </div>
                    <div className='price_'>
                        <p>Price:</p>
                        {item?.discount == 0?(
                            <p className='price'>{item?.price}</p>
                        ):(
                            <div className='price'>
                                <p>{`$${item?.price}`}</p>
                                <i className='fas fa-slash'></i>
                                <p>{`$${Number(item?.price - Number(item?.price) * (Number(item?.discount / 100)))}`}</p>
                                <div className='discount'>
                                    <p>{item?.discount}</p>
                                    <p>%</p>
                                    <p className='off'>Off</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='itemBottomDiv'>
                {item?.sellerId == user?.id?(
                    <div>
                       <p>You Own this</p>
                       <button onClick={() => {history.push(`/items/${item?.id}/edit`)}}>Edit</button>
                       <button>Delete</button>
                    </div>
                ):(<div style={{display: 'flex', 'alignItems': 'center', 'width': 250, justifyContent: 'space-around'}}>
                <div style={{display: 'flex', 'alignItems': 'center'}}>
                <i className='fas fa-dollar-sign'/>
                <p style={{marginLeft: 5}}>Have one to sell?</p>
                </div>
                <button>Sell Now</button>
            </div>)}
            </div>
        </div>
    </>
    )
}


export default ProductPage
