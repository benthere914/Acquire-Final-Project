import { useState } from "react"
import NewMessageModal from "../newMessageModal"

const SendMessageButton = ({receivingUser}) => {
    const [newMessageModal, setNewMessageModal] = useState(false)
    return (
    <>
   



    <div className='userTagParent'>
        <div className='userTag'>
        <p onClick={() => {setNewMessageModal(true)}} className='editAccountButton'>{`Message`}</p>
        {newMessageModal?<NewMessageModal setNewMessageModal={setNewMessageModal} receivingUser={receivingUser}/>:null}
        </div>
    </div>
    </>
    )
}

export default SendMessageButton
