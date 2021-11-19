import './index.css'
import { useDispatch } from 'react-redux'
import { getMessages } from '../../store/messages'
const EditMessagePopup = ({setButtonText, boardId, id, editMessageModal, setEditMessageModal, messageText}) => {
    const dispatch = useDispatch()

    const deleteMessageHandler = () => {
        setEditMessageModal(false)

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
