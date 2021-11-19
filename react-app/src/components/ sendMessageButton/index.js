import { useState } from "react"
import NewMessageModal from "../newMessageModal"

const SendMessageButton = ({receivingUser}) => {
    const [newMessageModal, setNewMessageModal] = useState(false)
    return (
    <>
    <p onClick={() => {setNewMessageModal(true)}} className='editAccountButton'>{`Message`}</p>
    {newMessageModal?<NewMessageModal setNewMessageModal={setNewMessageModal} receivingUser={receivingUser}/>:null}
    </>
    )
}

export default SendMessageButton
