import './index.css'
import { useHistory } from 'react-router';
const ItemCards = ({items}) => {
    const history = useHistory()
    return (
    <>
        <div className='itemCards'>
            {items?.map((item) => {
                return(
                    <div key={item?.id} className='itemCardDiv' onClick={() => {history.push(`/items/${item?.id}`)}}>
                        <div className='cardPhotoDiv'>
                            <img alt='carousel card' src={item?.photos[0]?.photoUrl}></img>
                        </div>
                        <div className='cardData'>
                            <p>{item?.name}</p>
                            <p>{item?.price}</p>
                            <p className='free shipping'>Free shipping</p>
                        </div>
                    </div>
                )
            }) }
        </div>
    </>
    )
}


export default ItemCards
