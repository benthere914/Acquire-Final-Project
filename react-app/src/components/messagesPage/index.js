import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getBuyerMessageBoards } from '../../store/buyerMessageBoards'
import { getSellerMessageBoards } from '../../store/sellerMessageBoards'
import MessageBoards from '../messageBoards'
const dateDiff = require('date-difference')
const MessagesPage = () => {
    const date = new Date()
    console.log(date)
    // console.log(dateDiff())
    const [selectedBoard, setSelectedBoard] = useState('seller')
    const dispatch = useDispatch()
    const selectedMessageBoards = useSelector(state => Object.values(state[`${selectedBoard}MessageBoards`]))
    const userId = useSelector(state => state.session.user.id)
    useEffect(() => {
        dispatch(getBuyerMessageBoards(userId))
        dispatch(getSellerMessageBoards(userId))
    }, [])
    const imgErrorHandler = (e) => {
        e.target.onerror = null;
        e.target.src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    }
    const dateConverter = (string) => {
        const today = new Date()
        const messageDate = new Date(string)
        const diff = dateDiff(messageDate, today)
        return diff.slice(0, 3)
    }


    return (
    <>
        <div>
            <div className='messagesPage'>
                <MessageBoards setSelectedBoard={setSelectedBoard} selectedBoard={selectedBoard} selectedMessageBoards={selectedMessageBoards} imgErrorHandler={imgErrorHandler} dateConverter={dateConverter}/>
                <div className='boardSelecterTabs'>


                </div>
            </div>
        </div>
    </>
    )
}

export default MessagesPage
