import './index.css'
import EditMessagePopup from '../editMessagePopup';
import { useState } from 'react';
const Message = ({editMessageModal, setEditMessageModal, selectedMessage,setSelectedMessage, userId, message, imgErrorHandler}) => {

    return (
    <>

    {message?.authorId == userId?
        <>
                <div className='message myUser' key={message?.id} onContextMenu={(e) => {setSelectedMessage(message?.id);e.preventDefault(); setEditMessageModal(true)}}>
                    <p>{message?.message}</p>
                    <img
                        src={message?.author?.icon}
                        alt={message?.author?.username}
                        onError={(e) => {imgErrorHandler(e)}}
                    />
                {editMessageModal && selectedMessage == message?.id?<EditMessagePopup editMessageModal={editMessageModal} setEditMessageModal={setEditMessageModal} id={message?.id}/>:null}
                </div>
        </>
        :
        <div className='message otherUser' key={message?.id}>
            <img
                src={message?.author?.icon}
                alt={message?.author?.username}
                onError={(e) => {imgErrorHandler(e)}}
                />
                <p>{message?.message}</p>
            </div>}
    </>
    )
}

export default Message
