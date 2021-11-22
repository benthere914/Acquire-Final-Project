import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getBuyerMessageBoards } from '../../store/buyerMessageBoards'
import { getSellerMessageBoards } from '../../store/sellerMessageBoards'
import { getMessages } from '../../store/messages'
import Message from '../message'
const Messages = ({boardTitle,customMenuId, customContextMenuVisible, setCustomContextMenuVisible, buttonText, setButtonText, setHasBoards, boardId, setBoardId, buyerId, setBuyerId, sellerId, setSellerId, setSelectedBoard, selectedBoard, selectedMessageBoards, imgErrorHandler, dateConverter}) => {
    const selectedMessageBoard = useSelector(state => state.selectedMessageBoard)
    const buyerMessageBoard = useSelector(state => Object.values(state.buyerMessageBoards))
    const sellerMessageBoard = useSelector(state => Object.values(state.sellerMessageBoards))
    const [buysLoaded, setBuysLoaded] = useState(false)
    const [sellsLoaded, setSellsLoaded] = useState(false)
    const messages = useSelector(state => Object.values(state.messages))
    const userId = useSelector(state => state.session.user.id)
    const [messageText, setMessageText] = useState('')
    const [selectedMessage, setSelectedMessage] = useState(0)
    const [editMessageModal, setEditMessageModal] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBuyerMessageBoards(userId)).then((e) => {
            if (e === 'success'){
                setBuysLoaded(true)
            }
        })
        dispatch(getSellerMessageBoards(userId)).then((e) => {
            if (e === 'success'){
                setSellsLoaded(true)

            }
        })
    }, [])
    useEffect(() => {
        if (buysLoaded && sellsLoaded){
            if (buyerMessageBoard.length ===  0 && sellerMessageBoard.length === 0){
                console.log('empty')
                setHasBoards(false)
            }
            else{
                setHasBoards(true)
                if (!boardId){
                    if (buyerMessageBoard.length !== 0){
                        setSelectedBoard('buyer')
                        setBuyerId(buyerMessageBoard[0]?.potentialBuyerId)
                        setSellerId(buyerMessageBoard[0]?.sellerId)
                        setBoardId(buyerMessageBoard[0]?.id)
                        dispatch(getMessages(buyerMessageBoard[0]?.id))
                    } else
                    if (sellerMessageBoard.length !== 0){
                        setSelectedBoard('seller')
                        setBuyerId(sellerMessageBoard[0]?.potentialBuyerId)
                        setSellerId(sellerMessageBoard[0]?.sellerId)
                        setBoardId(sellerMessageBoard[0]?.id)
                        dispatch(getMessages(sellerMessageBoard[0]?.id))
                    }
                }

            }
        }
    }, [selectedMessageBoard, buysLoaded, sellsLoaded, buyerMessageBoard, sellerMessageBoard])
    useEffect(() => {
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

    const editMessageHandler = async () => {

        const response = await fetch(`/api/messages/${selectedMessage}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'message': messageText})
        })
        const result = await response.json()
        if (result.message === 'success'){
            dispatch(getMessages(boardId))
            dispatch(getBuyerMessageBoards(userId))
            dispatch(getSellerMessageBoards(userId))
        }
        setButtonText('Send');
        setMessageText('')
    }

    const editMessageBoardHandler = async () => {
        const response = await fetch(`/api/messageBoards/${customMenuId}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'title': messageText})
        })
        const result = await response.json()
        if (result.message === 'success'){
            dispatch(getMessages(boardId))
            dispatch(getBuyerMessageBoards(userId))
            dispatch(getSellerMessageBoards(userId))
        }
        setButtonText('Send');
        setMessageText('')
        setCustomContextMenuVisible(false)


    }

    const deleteMessageBoardHandler = () => {

    }
    return (
    <div className='messagesDiv'>
        {customContextMenuVisible?
            <div className='messageBoardContextMenu'>
                {/* <h3>{boardTitle}</h3> */}
                <p onClick={() => {setButtonText('Edit Message Board Title')}} className='editMessageBoard'>Edit This Message Board's Title</p>
                <p onClick={() => {deleteMessageBoardHandler()}} className='deleteMessageBoard'>Delete This Message Board</p>
            </div>
        :null}
    {sellerId?
        <div className='messages' onMouseLeave={() => {setEditMessageModal(false)}}>
        {messages?.map((message) => (<Message setButtonText={setButtonText} boardId={boardId} editMessageModal={editMessageModal} setEditMessageModal={setEditMessageModal} selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} userId={userId} message={message} imgErrorHandler={imgErrorHandler}/>))}
        </div>
    :null}
    <input className='newMessageInput' value={messageText} onChange={(e) => {setMessageText(e.target.value)}}></input>
    <button
        style={buttonText==='Send'?{width: 125}:{width: 200, bottom: 30, left: 700}}
        onClick={buttonText === 'Send'?() => {sendMessageHandler()}:buttonText === 'Edit Message Board Title'?() => {editMessageBoardHandler()}:() =>  {editMessageHandler();}}>{buttonText}</button>
    </div>
    )
}

export default Messages
