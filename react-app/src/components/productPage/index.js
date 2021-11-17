import './index.css'
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../../store/selectedItem';
const ProductPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const item = useSelector(state => state.selectedItem)
    const photos = useSelector(state => state.selectedItem.photos)
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
                        <div className='imageDiv'>
                            {photos?.map((photo) => (<img src={photo?.photoUrl}></img>))}
                        </div>
                    </Carousel>
                </div>
                <div className='itemTopRightDiv'>

                </div>
            </div>
            <div className='itemBottomDiv'>
                <p>Test2</p>
            </div>
        </div>
    </>
    )
}


export default ProductPage
