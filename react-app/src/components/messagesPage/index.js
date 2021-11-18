import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMessageBoards } from '../../store/messageBoards'
const MessagesPage = () => {
    const dispatch = useDispatch()
    const messageBoards = useSelector(state => Object.values(state.messageBoards))
    const userId = useSelector(state => state.session.user.id)
    useEffect(() => {dispatch(getMessageBoards(userId))}, [userId])
    return (
    <>
        <div>
            <div>
                <p>Chats</p>
                <input type='text' placeholder='Search Your Messages'></input>
                <div>

                </div>
            </div>
        </div>
    </>
    )
}

export default MessagesPage
