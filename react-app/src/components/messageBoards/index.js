import './index.css'
const MessageBoards = ({selectedMessageBoards, imgErrorHandler, dateConverter}) => {
    return (
        <div className='messageBoards'>
            <p style={{fontSize: 25, margin: '0px 0px 5px 0px', position: 'relative', 'right': 115, fontWeight: 600}}>Chats</p>
                <input className='messagesSearch' type='text' placeholder='Search Your Messages'></input>
                <i className='fas fa-search'/>
                <div className='messageBoardTabs'>
                    {selectedMessageBoards.map((board) => (
                        <div className='messageBoardTab' key={board.id}>
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
