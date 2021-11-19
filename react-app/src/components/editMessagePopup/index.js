import './index.css'
import { useDispatch } from 'react-redux'
import { getMessages } from '../../store/messages'
import { getBuyerMessageBoards } from '../../store/buyerMessageBoards'
import { getSellerMessageBoards } from '../../store/sellerMessageBoards'
const EditMessagePopup = ({userId, setButtonText, boardId, id, editMessageModal, setEditMessageModal, messageText}) => {
    const dispatch = useDispatch()

    const editMessageHandler = async () => {

        const response = await fetch(`/api/messages/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'message': messageText})
        })


    }
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
        <p className='editOption' onClick={() => {setEditMessageModal(false);setButtonText('Update Message')}}>Edit this message</p>
        <p onClick={() => {deleteMessageHandler()}}>Delete this message</p>
    </div>
    </>
    )
}

export default EditMessagePopup
