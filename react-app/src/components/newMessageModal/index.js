import { useState } from 'react'
import { useSelector } from 'react-redux'
import './index.css'
const NewMessageModal = ({setNewMessageModal, receivingUser}) => {
    const userId = useSelector(state => state.session.user.id)
    const [message, setMessage] = useState('')
    const sendMessageHandler = async () => {
        await fetch('/api/messages/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sellerId: receivingUser?.id,
                buyerId: userId,
                message
            })
        })
    }
    return (
    <>
        <div className='newMessageModal'>
            <p>Send a message to:</p>
            <p>{receivingUser?.username}</p>
            <textarea
            rows={7}
            cols={30}
            value={message}
            onChange={(e) => {setMessage(e.target.value)}}/>
            <div>
                <p className='cancel' onClick={() => {setNewMessageModal(false);setMessage('')}}>Cancel</p>
                <p className='send' onClick={() => {sendMessageHandler()}}>Send</p>
            </div>
        </div>
    </>
    )
}

export default NewMessageModal
