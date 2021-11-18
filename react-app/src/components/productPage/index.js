import './index.css'
import { Carousel } from 'react-responsive-carousel';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../../store/selectedItem';
import UserTag from '../userTag';
import WarningModal from '../warningModal';
import { useState } from 'react';
const ProductPage = () => {
    const [password, setPassword] = useState('');
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
    const [deleteModal, setDeleteModal] = useState(false)
    const deletePostHandler = async () => {
        const response = await fetch(`/api/items/${params?.itemId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user, password
            }),
          });
            if (response.ok) {
                const item = await response.json().then((e) => {history.push(`/`)})
            }

    }
    useEffect(() => {
        if (params?.itemId){
            const itemId = params?.itemId
            dispatch(getItem(itemId))
        }
    }, [])
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
                       <button onClick={() => {setDeleteModal(true)}}>Delete</button>
                    </div>
                ):user?.id?(<div style={{display: 'flex', 'alignItems': 'center', 'width': 250, justifyContent: 'space-around'}}>
                <div style={{display: 'flex', 'alignItems': 'center'}}>
                <i className='fas fa-dollar-sign'/>
                <p style={{marginLeft: 5}}>Have one to sell?</p>
                </div>
                <button>Sell Now</button>
            </div>):null}
            </div>
        </div>
        {deleteModal?(
            <WarningModal
                mainMessage='Are you sure you want to delete this post? This can not be undone'
                mainButtonMessage={'Yes, I\'m sure. Delete This Post'}
                secondaryButtonMessage={'No. I\'m not sure.'}
                mainFunc={deletePostHandler}
                setWarningModal={setDeleteModal}
                text={password}
                setText={setPassword}
            />
        ):null}
    </>
    )
}


export default ProductPage
