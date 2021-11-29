import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessageBoard } from '../../store/selectedMessageBoard'
import { useHistory } from 'react-router-dom'
import './index.css'
const NewMessageModal = ({itemSelected, setNewMessageModal, receivingUser}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => state.session.user.id)
    const [badMessage, setBadMessage] = useState(false)
    const [message, setMessage] = useState('')
    const sendMessageHandler = () => {
        dispatch(setMessageBoard(itemSelected, userId, receivingUser?.id, userId, message, 'buyer')).then((e) => {
            if (e === 'bad message'){
                setBadMessage(true)
            }else{
            history.push('/messages')}})
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
            onChange={(e) => {setMessage(e.target.value); setBadMessage(false)}}
            style={badMessage?{border: 'solid red 2px'}:null}/>
            <div>
                <p className='cancel' onClick={() => {setNewMessageModal(false);setMessage('')}}>Cancel</p>
                <p className='send' onClick={() => {sendMessageHandler()}}>Send</p>
            </div>
        </div>
    </>
    )
}

export default NewMessageModal
