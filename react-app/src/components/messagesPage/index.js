import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getBuyerMessageBoards } from '../../store/buyerMessageBoards'
import { getSellerMessageBoards } from '../../store/sellerMessageBoards'
import MessageBoards from '../messageBoards'
import { getMessages } from '../../store/messages'
const dateDiff = require('date-difference')
const MessagesPage = () => {
    const date = new Date()
    console.log(date)
    const [selectedBoard, setSelectedBoard] = useState('seller')
    const [messageText, setMessageText] = useState('')
    const [sellerId, setSellerId] = useState(0)
    const [buyerId, setBuyerId] = useState(0)
    const [boardId, setBoardId] = useState(0)
    const dispatch = useDispatch()
    const selectedMessageBoards = useSelector(state => Object.values(state[`${selectedBoard}MessageBoards`]))
    const messages = useSelector(state => Object.values(state.messages))
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

    const sendMessageHandler = async () => {
        await fetch('/api/messages/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sellerId: sellerId,
                buyerId: buyerId,
                message: messageText
            })
        })
        setMessageText('')
        dispatch(getMessages(boardId))
    }

    return (
    <>
        <div>
            <div className='messagesPage'>
                <MessageBoards setBoardId={setBoardId} setBuyerId={setBuyerId} setSellerId={setSellerId} setSelectedBoard={setSelectedBoard} selectedBoard={selectedBoard} selectedMessageBoards={selectedMessageBoards} imgErrorHandler={imgErrorHandler} dateConverter={dateConverter}/>
                {sellerId?
                <div className='messages'>
                    {messages?.map((message) => (
                        <div className='message' key={message?.id}>
                            <img
                                src={message?.author?.icon}
                                alt={message?.author?.username}
                                onError={(e) => {imgErrorHandler(e)}}
                                />
                            <p>{message?.message}</p>
                            {/* <p className='messageDate'>{dateConverter(message?.createdAt)}</p> */}
                        </div>
                    ))}
                <input className='newMessageInput' value={messageText} onChange={(e) => {setMessageText(e.target.value)}}></input>
                <button onClick={() => {sendMessageHandler()}}>Send</button>
                </div>
                :null}
            </div>
        </div>
    </>
    )
}

export default MessagesPage
