import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getBuyerMessageBoards } from '../../store/buyerMessageBoards'
import { getSellerMessageBoards } from '../../store/sellerMessageBoards'
import { getMessages } from '../../store/messages'
const Messages = ({boardId, setBoardId, buyerId, setBuyerId, sellerId, setSellerId, setSelectedBoard, selectedBoard, selectedMessageBoards, imgErrorHandler, dateConverter}) => {
    const selectedMessageBoard = useSelector(state => state.selectedMessageBoard)
    const messages = useSelector(state => Object.values(state.messages))
    const userId = useSelector(state => state.session.user.id)
    const [messageText, setMessageText] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBuyerMessageBoards(userId))
        dispatch(getSellerMessageBoards(userId))
    }, [])
    useEffect(() => {
        console.log(selectedMessageBoard)
        if (selectedMessageBoard?.messageBoardId){
            setSelectedBoard(selectedMessageBoard?.boardType)
            setBuyerId(selectedMessageBoard?.buyerId)
            setSellerId(selectedMessageBoard?.sellerId)
            setBoardId(selectedMessageBoard?.messageBoardId)
            dispatch(getMessages(selectedMessageBoard?.messageBoardId))
        }
    }, [selectedMessageBoard])

    const sendMessageHandler = async () => {
        await fetch('/api/messages/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                authorId: userId,
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
                <p>{message?.author?.username}</p>
                {/* <p className='messageDate'>{dateConverter(message?.createdAt)}</p> */}
            </div>
        ))}
        </div>
    :null}
    <input className='newMessageInput' value={messageText} onChange={(e) => {setMessageText(e.target.value)}}></input>
    <button onClick={() => {sendMessageHandler()}}>Send</button>
    </>
    )
}

export default Messages
