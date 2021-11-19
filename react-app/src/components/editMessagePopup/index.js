import './index.css'
const EditMessagePopup = ({id, editMessageModal, setEditMessageModal, messageText}) => {

    const editMessageHandler = async () => {
        setEditMessageModal(false)
        const response = await fetch(`/api/messages/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'message': 'test'})
        })
        const result = await response.json()
        if (result.message === 'success'){
            
        }

    }
    const deleteMessageHandler = () => {
        setEditMessageModal(false)

    }

    return (
    <>
    <div className='editMessagePopup'>
        <p className='editOption' onClick={() => {editMessageHandler()}}>Edit this message</p>
        <p onClick={() => {deleteMessageHandler()}}>Delete this message</p>
    </div>
    </>
    )
}

export default EditMessagePopup
