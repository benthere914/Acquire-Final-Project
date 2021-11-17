import './index.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselCard from '../carouselCard';
import ItemCards from '../itemCard';
import { Carousel } from 'react-responsive-carousel';
import Search from '../search';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTopItems } from '../../store/items';
import { useHistory } from 'react-router';
const SplashPage = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => Object.values(state.items))
    const history = useHistory()
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
        <ItemCards items={items}/>
    </>
    )
}


export default SplashPage
