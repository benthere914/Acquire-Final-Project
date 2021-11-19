import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getBuyerMessageBoards } from '../../store/buyerMessageBoards'
import { getSellerMessageBoards } from '../../store/sellerMessageBoards'
const dateDiff = require('date-difference')
const MessagesPage = () => {
    const date = new Date()
    console.log(date)
    // console.log(dateDiff())
    const [selectedBoard, setSelectedBoard] = useState('seller')
    const dispatch = useDispatch()
    const buyerMessageBoards = useSelector(state => Object.values(state.buyerMessageBoards))
    const sellerMessageBoards = useSelector(state => Object.values(state.sellerMessageBoards))
    const selectedMessageBoards = useSelector(state => Object.values(state[`${selectedBoard}MessageBoards`]))
    const userId = useSelector(state => state.session.user.id)
    useEffect(() => {
        dispatch(getBuyerMessageBoards(userId))
        dispatch(getSellerMessageBoards(userId))
    }, [userId])
    const dateConverter = (string) => {
        const today = new Date()
        const messageDate = new Date(string)
        const diff = dateDiff(messageDate, today)
        return diff.slice(0, 3)
    }


    return (
    <>
        <div>
            <div>
                <p>Chats</p>
                <input type='text' placeholder='Search Your Messages'></input>
                <div>
                    {selectedMessageBoards.map((board) => (
                        <div key={board.id}>
                            <img src={board?.user?.icon}/>
                            <p>{board?.user?.username}</p>
                            <p>{board?.last_message?.message}</p>
                            <p>{dateConverter(board?.last_message?.createdAt)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
    )
}

export default MessagesPage
