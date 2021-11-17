import './index.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselCard from '../carouselCard';
import { Carousel } from 'react-responsive-carousel';
import Search from '../search';
const SplashPage = () => {
    return (
    <>
        <Search/>
        <Carousel autoPlay={true} interval={3000} infiniteLoop={true}>
            <CarouselCard id={1}/>
            <CarouselCard id={2}/>
            <CarouselCard id={3}/>
        </Carousel>
        <p className='featuredDeals'>Featured Deals</p>
    </>
    )
}


export default SplashPage
