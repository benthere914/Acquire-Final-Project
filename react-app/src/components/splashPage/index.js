import './index.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselCard from '../carouselCard';
import ItemCards from '../itemCard';
import { Carousel } from 'react-responsive-carousel';
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
        {/* <Search/> */}
        <div className='splashPage'>

        <div className='splashDivCarousel'>
            <Carousel autoPlay={false} interval={3000} infiniteLoop={true} showThumbs={false} showArrows={false}>
                <CarouselCard id={1}/>
                <CarouselCard id={2}/>
                <CarouselCard id={3}/>
            </Carousel>
        </div>
        <p className='featuredDeals'>Featured Deals</p>
        <ItemCards items={items}/>
        </div>
    </>
    )
}


export default SplashPage
