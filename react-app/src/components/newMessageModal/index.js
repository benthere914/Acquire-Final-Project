import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessageBoard } from '../../store/selectedMessageBoard'
import { useHistory } from 'react-router-dom'
import './index.css'
const NewMessageModal = ({itemSelected, setNewMessageModal, receivingUser}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => state.session.user.id)
    const [message, setMessage] = useState('')
    const sendMessageHandler = () => {
        console.log('got here')
        console.log(itemSelected)
        dispatch(setMessageBoard(itemSelected, userId, receivingUser?.id, userId, message, 'buyer')).then(() => history.push('/messages'))
        console.log('got here too')
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
