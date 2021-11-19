import './index.css'
const Message = ({userId, message, imgErrorHandler}) => {
    console.log(message)
    return (
    <>
    {message?.authorId == userId?
        <div className='message otherUser' key={message?.id}>
            {/* <p>{message?.author?.username}</p> */}
            <img
                src={message?.author?.icon}
                alt={message?.author?.username}
                onError={(e) => {imgErrorHandler(e)}}
                />
                <p>{message?.message}</p>
                {/* <p className='messageDate'>{dateConverter(message?.createdAt)}</p> */}
            </div>
        :
        <div className='message myUser' key={message?.id}>
            <p>{message?.message}</p>
            <img
                src={message?.author?.icon}
                alt={message?.author?.username}
                onError={(e) => {imgErrorHandler(e)}}
                />
                {/* <p>{message?.author?.username}</p> */}
                {/* <p className='messageDate'>{dateConverter(message?.createdAt)}</p> */}
            </div>}
    </>
    )
}

export default Message
