import './index.css'
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const ProductPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const item = useSelector(state => state.selectedItem)
    useEffect(() => {
        if (params?.itemId){
            const itemId = params?.itemId


        }
    }, [])
    return (
    <>
        <div>
            <div>
            <Carousel autoPlay={true} interval={3000} infiniteLoop={true}>

            </Carousel>
            </div>
            <div>
                <p>Test2</p>
            </div>
        </div>
    </>
    )
}


export default ProductPage
