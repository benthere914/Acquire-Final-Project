import './index.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselCard from '../carouselCard';
import { Carousel } from 'react-responsive-carousel';
const SplashPage = () => {
    return (
    <>
        <Carousel autoPlay={true} interval={3000} infiniteLoop={true}>
            <CarouselCard id={1}/>
            <CarouselCard id={2}/>
            <CarouselCard id={3}/>
        </Carousel>
    </>
    )
}


export default SplashPage
