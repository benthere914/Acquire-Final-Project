import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getBuyerMessageBoards } from '../../store/buyerMessageBoards'
import { getSellerMessageBoards } from '../../store/sellerMessageBoards'
import { getMessages } from '../../store/messages'
import Message from '../message'
const Messages = ({boardId, setBoardId, buyerId, setBuyerId, sellerId, setSellerId, setSelectedBoard, selectedBoard, selectedMessageBoards, imgErrorHandler, dateConverter}) => {
    const selectedMessageBoard = useSelector(state => state.selectedMessageBoard)
    const messages = useSelector(state => Object.values(state.messages))
    const userId = useSelector(state => state.session.user.id)
    const [messageText, setMessageText] = useState('')
    const [selectedMessage, setSelectedMessage] = useState(0)
    const [editMessageModal, setEditMessageModal] = useState(false)

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
        <div className='messages' onMouseLeave={() => {setEditMessageModal(false)}}>
        {messages?.map((message) => (<Message editMessageModal={editMessageModal} setEditMessageModal={setEditMessageModal} selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} userId={userId} message={message} imgErrorHandler={imgErrorHandler}/>))}
        </div>
    :null}
    <input className='newMessageInput' value={messageText} onChange={(e) => {setMessageText(e.target.value)}}></input>
    <button onClick={() => {sendMessageHandler()}}>Send</button>
    </>
    )
}

export default Messages
