import './index.css'
import { useDispatch } from 'react-redux'
import { getMessages } from '../../store/messages'
const MessageBoards = ({setSelectedBoard, selectedBoard={selectedBoard}, selectedMessageBoards, imgErrorHandler, dateConverter}) => {
    const dispatch = useDispatch()
    return (
        <div className='messageBoards'>
            <p style={{fontSize: 25, margin: '0px 0px 5px 0px', position: 'relative', 'right': 115, fontWeight: 600}}>Chats </p>
            <div className='messageBoardSelectTabs'>
                <p style={selectedBoard === 'seller'?{backgroundColor: 'gray', color: 'white'}:null} onClick={() => setSelectedBoard('seller')}>Sell</p>
                <p style={selectedBoard === 'buyer'?{backgroundColor: 'gray', color: 'white'}:null} onClick={() => setSelectedBoard('buyer')}>Buy</p>
            </div>
                <input className='messagesSearch' type='text' placeholder='Search Your Messages'></input>
                <i className='fas fa-search'/>
                <div className='messageBoardTabs'>
                    {selectedMessageBoards.map((board) => (
                        <div onClick={() => {dispatch(getMessages(board?.id))}} className='messageBoardTab' key={board.id}>
                            <img
                                src={board?.user?.icon}
                                alt={`chat room with ${board?.user?.username}`}
                                onError={(e) => {imgErrorHandler(e)}}
                                />
                            <p className='username'>{board?.user?.username}</p>
                            <p className='message'>{board?.last_message?.message}</p>
                            <p className='timeSince'>{dateConverter(board?.last_message?.createdAt)}</p>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default MessageBoards
