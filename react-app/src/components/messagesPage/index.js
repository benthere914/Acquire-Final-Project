import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getBuyerMessageBoards } from '../../store/buyerMessageBoards'
import { getSellerMessageBoards } from '../../store/sellerMessageBoards'
import Messages from '../messages'
import MessageBoards from '../messageBoards'
import { getMessages } from '../../store/messages'
const dateDiff = require('date-difference')
const MessagesPage = () => {
    const [buttonText, setButtonText] = useState('Send')


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
    const [selectedBoard, setSelectedBoard] = useState('seller')
    const [boardId, setBoardId] = useState(0)
    const [sellerId, setSellerId] = useState(0)
    const [buyerId, setBuyerId] = useState(0)
    const selectedMessageBoards = useSelector(state => Object.values(state[`${selectedBoard}MessageBoards`]))
    const [hasBoards, setHasBoards] = useState(true)
    const [customContextMenuVisible, setCustomContextMenuVisible] = useState(false)
    const [customMenuId, setCustomMenuId] = useState(0)
    const [boardTitle, setBoardTitle] = useState('')
    const [boardsToMap, setBoardsToMap] = useState([])

    return (
    <>
        <div>
            <div className='messagesPage'>
                <MessageBoards
                    setBoardsToMap={setBoardsToMap}
                    boardsToMap={boardsToMap}
                    setBoardTitle={setBoardTitle}
                    setCustomContextMenuVisible={setCustomContextMenuVisible}
                    setCustomMenuId={setCustomMenuId}
                    buttonText={buttonText}
                    setButtonText={setButtonText}
                    setHasBoards={setHasBoards}
                    boardId={boardId}
                    setBoardId={setBoardId}
                    setBuyerId={setBuyerId}
                    setSellerId={setSellerId}
                    setSelectedBoard={setSelectedBoard}
                    selectedBoard={selectedBoard}
                    selectedMessageBoards={selectedMessageBoards}
                    imgErrorHandler={imgErrorHandler}
                    dateConverter={dateConverter}/>
                {hasBoards?
                <Messages
                    setBoardsToMap={setBoardsToMap}
                    boardsToMap={boardsToMap}
                    boardTitle={boardTitle}
                    setBoardTitle={setBoardTitle}
                    customContextMenuVisible={customContextMenuVisible}
                    setCustomContextMenuVisible={setCustomContextMenuVisible}
                    customMenuId={customMenuId}
                    buttonText={buttonText}
                    setButtonText={setButtonText}
                    setHasBoards={setHasBoards}
                    setBoardId={setBoardId}
                    boardId={boardId}
                    sellerId={sellerId}
                    buyerId={buyerId}
                    setBuyerId={setBuyerId}
                    setSellerId={setSellerId}
                    setSelectedBoard={setSelectedBoard}
                    selectedBoard={selectedBoard}
                    selectedMessageBoards={selectedMessageBoards}
                    imgErrorHandler={imgErrorHandler}
                    dateConverter={dateConverter}/>
                    :<p>You have no messages. Please visit someones profile to send a message</p>}
            </div>
        </div>
    </>
    )
}

export default MessagesPage


// <div className='messagesPage'>
//                 <MessageBoards setBoardId={setBoardId} setBuyerId={setBuyerId} setSellerId={setSellerId} setSelectedBoard={setSelectedBoard} selectedBoard={selectedBoard} selectedMessageBoards={selectedMessageBoards} imgErrorHandler={imgErrorHandler} dateConverter={dateConverter}/>
//                 {sellerId?
//                 <div className='messages'>
//                     {messages?.map((message) => (
//                         <div className='message' key={message?.id}>
//                             <img
//                                 src={message?.author?.icon}
//                                 alt={message?.author?.username}
//                                 onError={(e) => {imgErrorHandler(e)}}
//                                 />
//                             <p>{message?.message}</p>
//                             <p>{message?.author?.username}</p>
//                             {/* <p className='messageDate'>{dateConverter(message?.createdAt)}</p> */}
//                         </div>
//                     ))}
//                 </div>
//                 :null}
//                 <input className='newMessageInput' value={messageText} onChange={(e) => {setMessageText(e.target.value)}}></input>
//                 <button onClick={() => {sendMessageHandler()}}>Send</button>
//             </div>
