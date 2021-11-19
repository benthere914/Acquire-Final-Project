import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getBuyerMessageBoards } from '../../store/buyerMessageBoards'
import { getSellerMessageBoards } from '../../store/sellerMessageBoards'
const MessagesPage = () => {
    const dispatch = useDispatch()
    const buyerMessageBoards = useSelector(state => Object.values(state.buyerMessageBoards))
    const sellerMessageBoards = useSelector(state => Object.values(state.sellerMessageBoards))
    const userId = useSelector(state => state.session.user.id)
    useEffect(() => {
        dispatch(getBuyerMessageBoards(userId))
        dispatch(getSellerMessageBoards(userId))
    }, [userId])
    return (
    <>
        <div>
            <div>
                <p>Chats</p>
                <input type='text' placeholder='Search Your Messages'></input>
                <div>

                </div>
            </div>
        </div>
    </>
    )
}

export default MessagesPage
