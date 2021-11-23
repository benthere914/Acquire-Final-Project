import { useHistory } from 'react-router'
import './index.css'
const CarouselCard = ({id}) => {
    const history = useHistory()
    if (id === 1){
        return (
            <>
            <div className='carouselParent' onClick={() => {history.push('/search/Computers%20&%20Tables/')}}>
                <div className='carouselCard1'>
                    <div className='mainDiv1'>
                        <p className='mainPTag1'>Gifts for the ultimate Gamer</p>
                        <p className='secondaryPTag1'>Score up to 60% off Xbox One, SteelSeries headset, and more.</p>
                    </div>
                    <div className='imagesDiv1'>
                        <img alt='carousel card' src='https://i.ebayimg.com/images/g/PEgAAOSwVbNhhZLF/s-l960.webp'></img>
                    </div>
                </div>
            </div>
            </>
        )
    }

    else if (id === 2){
        return (
            <>
            <div className='carouselParent' onClick={() => {history.push('/search/Toys%20&%20Hobbies/')}}>
                <div className='carouselCard2'>
                    <div className='mainDiv2'>
                        <p className='mainPTag2'>Get more 'OMG' for your buck</p>
                        <p className='secondaryPTag2'>Pick from a wide range of holiday gifts at great prices.</p>
                    </div>
                    <div className='imagesDiv2'>
                        <img alt='carousel card' src='https://i.ebayimg.com/images/g/0iIAAOSwNjhhhWpu/s-l1600.webp'></img>
                    </div>
                </div>
            </div>
            </>
        )
    }
    else if (id === 3){
        return (
            <>
            <div className='carouselParent'>
            <div className='carouselCard3' style={{backgroundColor: 'rgb(230, 32, 72)'}}>
                <div className='mainDiv3'>
                    <p>We've got a feeling you'll love these</p>
                    <button>Shop All Tech <span><i className='fas fa-arrow-right'></i></span></button>
                </div>
                <div className='imagesDiv3' >
                    <img alt='carousel card' src='https://i.ebayimg.com/images/g/apkAAOSwkSJc0K6h/s-l400.webp'></img>
                    <img alt='carousel card' src='https://i.ebayimg.com/images/g/dCIAAOSwvxtc0K6q/s-l400.webp'></img>
                    <img alt='carousel card' src='https://i.ebayimg.com/images/g/uAYAAOSwdHhc0K6y/s-l400.webp'></img>
                </div>
            </div>
            </div>
            <div className='click1' onClick={() => {history.push('/search/Phones%20and%20Accessories/')}}>

            </div>
            <div className='click2' onClick={() => {history.push('/search/Electronics/Television')}}>

            </div>
            <div className='click3' onClick={() => {history.push('/search/Game%20Consoles/')}}>

            </div>

            </>
        )
    }
}

export default CarouselCard
