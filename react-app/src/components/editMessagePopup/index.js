import './index.css'
import { useDispatch } from 'react-redux'
import { getMessages } from '../../store/messages'
import { getBuyerMessageBoards } from '../../store/buyerMessageBoards'
import { getSellerMessageBoards } from '../../store/sellerMessageBoards'
const EditMessagePopup = ({setMessageText, userId, setButtonText, boardId, id, editMessageModal, setEditMessageModal, messageText}) => {
    const dispatch = useDispatch()
    const deleteMessageHandler = async () => {
        setEditMessageModal(false)
        const response = await fetch(`/api/messages/${id}`,{method: 'DELETE'})

        const result = await response.json()
        if (result.message === 'success'){
            dispatch(getMessages(boardId))
            dispatch(getBuyerMessageBoards(userId))
            dispatch(getSellerMessageBoards(userId))
        }

    }

    return (
    <>
    <div className='editMessagePopup'>
        <p className='editOption' onClick={() => {setMessageText(messageText);setEditMessageModal(false);setButtonText('Update Message')}}>Edit this message</p>
        <p onClick={() => {deleteMessageHandler()}}>Delete this message</p>
    </div>
    </>
    )
}

export default EditMessagePopup
