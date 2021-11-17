import './index.css'
import { useHistory } from 'react-router';
const ItemCards = ({items}) => {
    const history = useHistory()
    return (
    <>
        <div className='itemCards'>
            {items?.map((item) => (
                <div key={item?.id} className='itemCardDiv' onClick={() => {history.push(`/items/${item?.id}`)}}>
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


export default ItemCards
