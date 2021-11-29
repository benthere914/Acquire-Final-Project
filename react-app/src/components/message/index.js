import './index.css'
import EditMessagePopup from '../editMessagePopup';
import { useHistory } from 'react-router';
const Message = ({count, setMessageText, setButtonText, boardId, editMessageModal, setEditMessageModal, selectedMessage,setSelectedMessage, userId, message, imgErrorHandler}) => {
    const history = useHistory()
    const longWord = (message) => {
        let words = message.split(' ')
        for (let i = 0; i < words.length; i++){
            if (words[i].length > 25){
                words[i] = words[i].slice(0, 25)
                words[i] += '...'
            }
        }
        words = words.join(' ')
        return words
    }
    return (
    <>
        {message?.authorId === userId?
            <>
                <div
                    className='message myUser'
                    onContextMenu={(e) => {setSelectedMessage(message?.id);e.preventDefault(); setEditMessageModal(true)}}
                    style={count <= 8? {bottom: 50, top: 0}: null}
                >
                    <p>{longWord(message?.message)}</p>
                    <img
                        src={message?.author?.icon}
                        alt={message?.author?.username}
                        onError={(e) => {imgErrorHandler(e)}}
                    />
                    {editMessageModal && selectedMessage === message?.id?<EditMessagePopup setMessageText={setMessageText} messageText={message?.message} userId={userId} setButtonText={setButtonText} boardId={boardId} editMessageModal={editMessageModal} setEditMessageModal={setEditMessageModal} id={message?.id}/>:null}
                </div>
            </>
        :
            <div
                className='message otherUser'
                onClick={() => {history.push(`/users/${message?.author?.id}`)}}>
                <img
                    src={message?.author?.icon}
                    alt={message?.author?.username}
                    onError={(e) => {imgErrorHandler(e)}}
                />
                <p>{message?.message}</p>
            </div>}
    </>
    )
}

export default Message
