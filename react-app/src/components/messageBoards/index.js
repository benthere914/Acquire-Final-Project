import './index.css'
import { useDispatch } from 'react-redux'
import { getMessages } from '../../store/messages'
import { useEffect } from 'react'
import { useState } from 'react'
const MessageBoards = ({setBoardTitle, setCustomContextMenuVisible,setCustomMenuId,  buttonText, setButtonText, setHasBoards, boardId, setBoardId, setBuyerId, setSellerId, setSelectedBoard, selectedBoard, selectedMessageBoards, imgErrorHandler, dateConverter}) => {
    const dispatch = useDispatch()
    const [messageSearch, setMessageSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [viewSearch, setViewSearch] = useState(false)
    const [readyToUpdate, setReadyToUpdate] = useState(false)

    useEffect(() => {
        if (viewSearch){
            setSearchResults([...selectedMessageBoards])
            setReadyToUpdate(true)
        }
    },[viewSearch])
    const message_board_left_click_handler = (board) => {
        dispatch(getMessages(board?.id));
        setBoardId(board?.id);
        setSellerId(board?.sellerId);
        setBuyerId(board?.potentialBuyerId)
        setBoardTitle(board?.title)
        setButtonText('Send')
        setCustomContextMenuVisible(false)
    }
    const message_board_right_click_handler = (e, id, title) => {
        e.preventDefault()
        setCustomMenuId(id)
        setBoardId(id)
        dispatch(getMessages(id))
        setBoardTitle(title)
        setCustomContextMenuVisible(true)
    }

    const messagesContain = (messages, string) => {
        messages = Object.values(messages)
        for (let i = 0; i < messages?.length; i++){
            if (messages[i].message?.includes(string)){
                console.log(messages[i]?.message, string)
                return true
            }
        }
        return false
    }

    const message_search_onChange_handler = (e) => {
        setMessageSearch(e.target.value)
        if (e.target.value === ''){
            setViewSearch(false)
            setReadyToUpdate(false)
        }
        if (e.target.value){
            setViewSearch(true)
            setSearchResults((prev) => {
                const temp = []
                for (let i = 0; i < prev?.length; i++){
                    if (prev[i]?.title.includes(e.target.value)){
                        temp.unshift(prev[i])
                    }
                    else if (messagesContain(prev[i].messages, e.target.value)){
                        temp.push(prev[i])
                    }
                }
                return temp
            })
        }


    }
    return (
        <div className='messageBoards'>
            <p style={{fontSize: 25, margin: '0px 0px 5px 0px', position: 'relative', 'right': 115, fontWeight: 600}}>Chats </p>
            {!viewSearch &&
            <div className='messageBoardSelectTabs'>
                <p style={selectedBoard === 'seller'?{backgroundColor: 'gray', color: 'white'}:null} onClick={() => setSelectedBoard('seller')}>Sell</p>
                <p style={selectedBoard === 'buyer'?{backgroundColor: 'gray', color: 'white'}:null} onClick={() => setSelectedBoard('buyer')}>Buy</p>
            </div>
            }
                <input
                    className='messagesSearch'
                    type='text'
                    placeholder='Search Your Messages'
                    value={messageSearch}
                    onChange={(e) => {message_search_onChange_handler(e)}}
                    >
                </input>
                <i className='fas fa-search'/>
                <div className='messageBoardTabs'>

                    {!viewSearch?(
                        selectedMessageBoards.map((board) => (
                        <>
                        <div
                        style={boardId === board?.id?{backgroundColor: 'lightblue'}: null}
                        // style={board?.id === customMenuId?{backgroundColor: 'orange'}:null}
                        onClick={() => {message_board_left_click_handler(board)}}
                        onContextMenu={(e) => {message_board_right_click_handler(e, board?.id, board?.title)}}
                        className='messageBoardTab'
                        key={board.id}>
                        <img
                        src={board?.user?.icon}
                        alt={`chat room with ${board?.user?.username}`}
                        onError={(e) => {imgErrorHandler(e)}}
                        />
                        <p className='username'>{board?.user?.username}</p>
                        <p className='lastMessage'>{board?.last_message?.message}</p>
                        <p className='timeSince'>{dateConverter(board?.last_message?.createdAt)}</p>
                        </div>
                        {/* {board?.id === boardId && <p className='boardTitle'>{board?.title}</p>} */}
                        </>
                        ))
                    ):
                    searchResults.map((board) => (
                        <>
                        <div
                        style={boardId === board?.id?{backgroundColor: 'lightblue'}: null}
                        // style={board?.id === customMenuId?{backgroundColor: 'orange'}:null}
                        onClick={() => {message_board_left_click_handler(board)}}
                        onContextMenu={(e) => {message_board_right_click_handler(e, board?.id, board?.title)}}
                        className='messageBoardTab'
                        key={board.id}>
                            <img
                                src={board?.user?.icon}
                                alt={`chat room with ${board?.user?.username}`}
                                onError={(e) => {imgErrorHandler(e)}}
                                />
                            <p className='username'>{board?.user?.username}</p>
                            <p className='lastMessage'>{board?.last_message?.message}</p>
                            <p className='timeSince'>{dateConverter(board?.last_message?.createdAt)}</p>
                        </div>
                        {/* {board?.id === boardId && <p className='boardTitle'>{board?.title}</p>} */}
                        </>
                    ))}


                </div>


        </div>
    )
}

export default MessageBoards
