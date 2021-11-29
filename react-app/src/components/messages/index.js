import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getBuyerMessageBoards } from '../../store/buyerMessageBoards'
import { getSellerMessageBoards } from '../../store/sellerMessageBoards'
import { getMessages } from '../../store/messages'
import Message from '../message'
import { reset } from '../../store/selectedMessageBoard'
const Messages = ({badMessage, setBadMessage, boardTitle, setBoardTitle, customMenuId, customContextMenuVisible, setCustomContextMenuVisible, buttonText, setButtonText, setHasBoards, boardId, setBoardId, buyerId, setBuyerId, sellerId, setSellerId, setSelectedBoard, selectedBoard, selectedMessageBoards, imgErrorHandler, dateConverter}) => {
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
    const [loadCount, setLoadCount] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        if (selectedMessageBoard?.messageBoardId){
            setSelectedBoard(selectedMessageBoard?.boardType)
            setBuyerId(selectedMessageBoard?.buyerId)
            setSellerId(selectedMessageBoard?.sellerId)
            setBoardId(selectedMessageBoard?.messageBoardId)
            dispatch(getMessages(selectedMessageBoard?.messageBoardId))
            dispatch(getBuyerMessageBoards(userId))
            dispatch(getSellerMessageBoards(userId))
            setBoardTitle(selectedMessageBoard?.title)
            dispatch(reset())
        }
    }, [selectedMessageBoard])

    useEffect(() => {
        if (selectedMessageBoard?.messageBoardId){return}
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
    }, [loadCount])
    useEffect(() => {
        if (buysLoaded && sellsLoaded){
            setBuysLoaded(false)
            setSellsLoaded(false)
            if (buyerMessageBoard.length ===  0 && sellerMessageBoard.length === 0){
                setHasBoards(false)
            }
            else{
                setHasBoards(true)
                    if (buyerMessageBoard.length !== 0){
                        setSelectedBoard('buyer')
                        setBuyerId(buyerMessageBoard[0]?.potentialBuyerId)
                        setSellerId(buyerMessageBoard[0]?.sellerId)
                        setBoardId(buyerMessageBoard[0]?.id)
                        dispatch(getMessages(buyerMessageBoard[0]?.id))
                        setBoardTitle(buyerMessageBoard[0]?.title)
                    } else
                    if (sellerMessageBoard.length !== 0){
                        setSelectedBoard('seller')
                        setBuyerId(sellerMessageBoard[0]?.potentialBuyerId)
                        setSellerId(sellerMessageBoard[0]?.sellerId)
                        setBoardId(sellerMessageBoard[0]?.id)
                        dispatch(getMessages(sellerMessageBoard[0]?.id))
                        setBoardTitle(buyerMessageBoard[0]?.title)
                    }
            }
        }
    }, [selectedMessageBoard, buysLoaded, sellsLoaded, buyerMessageBoard, sellerMessageBoard])


    const sendMessageHandler = async () => {
        const response = await fetch('/api/messages/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                authorId: userId,
                sellerId: sellerId,
                buyerId: buyerId,
                message: messageText,
                itemSelected: boardTitle
            })
        })
        if (response.ok){
            setMessageText('')
            dispatch(getMessages(boardId))
            dispatch(getBuyerMessageBoards(userId))
            dispatch(getSellerMessageBoards(userId))
        }
        else{
            setBadMessage(true)
        }


    }

    const editMessageHandler = async () => {

        const response = await fetch(`/api/messages/${selectedMessage}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'message': messageText})
        })
        const result = await response.json()
        if (response.ok){
            dispatch(getMessages(boardId))
            dispatch(getBuyerMessageBoards(userId))
            dispatch(getSellerMessageBoards(userId))
            setButtonText('Send');
            setMessageText('')
            }
        else {
            setBadMessage(true)
        }
    }

    const editMessageBoardHandler = async () => {
        const response = await fetch(`/api/messageBoards/${customMenuId}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'title': messageText})
        })
        const result = await response.json()
        if (response.ok){
            dispatch(getMessages(boardId))
            dispatch(getBuyerMessageBoards(userId))
            dispatch(getSellerMessageBoards(userId))
            setBoardTitle(messageText)
            setButtonText('Send');
            setMessageText('')
            setCustomContextMenuVisible(false)
        }
        else {
            setBadMessage(true)
        }
    }
    const deleteMessageBoardHandler = async () => {
        const response = await fetch(`/api/messageBoards/${boardId}`,{method: 'DELETE'})
        const result = await response.json()
        if (result.message === 'success'){
            setLoadCount((prev) => prev + 1)
        }
        setButtonText('Send');
        setMessageText('')
        setCustomContextMenuVisible(false)
    }
    return (
    <div className='messagesDiv'>
        {customContextMenuVisible?
            <div className='messageBoardContextMenu'>
                <p onClick={() => {setMessageText(boardTitle);setButtonText('Edit Message Board Title')}} className='editMessageBoard'>Edit This Message Board's Title</p>
                <p onClick={() => {deleteMessageBoardHandler()}} className='deleteMessageBoard'>Delete This Message Board</p>
            </div>
        :null}
    {sellerId?
        <>
            <div className='boardTitle'>
                <p
                    style={customContextMenuVisible?{width: 350, maxWidth: 350, overflow: 'hidden', textOverflow: 'ellipsis'}:null}
                >{boardTitle}</p>
            </div>
        <div style={messages?.length <= 8? {justifyContent: 'flex-end'}:null} style={{display: 'flex', flexDirection: 'column-reverse'}} className='messages' onMouseLeave={() => {setEditMessageModal(false);}}>
            {messages?.reverse()?.map((message) => (<div key={message?.id}><Message count={messages?.length} setMessageText={setMessageText} setButtonText={setButtonText} boardId={boardId} editMessageModal={editMessageModal} setEditMessageModal={setEditMessageModal} selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} userId={userId} message={message} imgErrorHandler={imgErrorHandler}/></div>))}
            </div>
        </>
    :null}
    <input style={badMessage?{border: 'solid red 1px'}:null} className='newMessageInput' value={messageText} onChange={(e) => {setMessageText(e.target.value); setBadMessage(false)}}></input>
    <button
        style={buttonText==='Send'?{width: 125}:{width: 200, bottom: 30, left: 700}}
        onClick={buttonText === 'Send'?() => {sendMessageHandler()}:buttonText === 'Edit Message Board Title'?() => {editMessageBoardHandler()}:() =>  {editMessageHandler();}}>{buttonText}</button>
    </div>
    )
}

export default Messages
