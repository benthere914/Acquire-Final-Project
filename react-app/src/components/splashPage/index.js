import './index.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselCard from '../carouselCard';
import { Carousel } from 'react-responsive-carousel';
import Search from '../search';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTopItems } from '../../store/items';
const SplashPage = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => Object.values(state.items))
    useEffect(() => {
        dispatch(getTopItems())
    }, [])
    return (
    <>
        <Search/>
        <Carousel autoPlay={true} interval={3000} infiniteLoop={true}>
            <CarouselCard id={1}/>
            <CarouselCard id={2}/>
            <CarouselCard id={3}/>
        </Carousel>
        <p className='featuredDeals'>Featured Deals</p>
        <div className='itemCards'>
            {items?.map((item) => (
                <div key={item?.id} className='itemCardDiv'>
                    <div className='cardPhotoDiv'>
                        <img src={item?.photos[0].photoUrl}></img>
                    </div>
                    <div>
                        <p>{item?.name}</p>
                        <p>{item?.price}</p>
                        <p className='free shipping'>Free shipping</p>
                    </div>
                </div>
            )) }
        </div>
    </>
    )
}


export default SplashPage
