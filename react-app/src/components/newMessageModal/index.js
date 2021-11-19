import { useState } from 'react'
import './index.css'
const NewMessageModal = ({setNewMessageModal, receivingUser}) => {
    const [message, setMessage] = useState('')
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
                <p className='send'>Send</p>
            </div>
        </div>
    </>
    )
}

export default NewMessageModal
