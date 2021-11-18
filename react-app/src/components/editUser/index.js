import './index.css'
import { useParams, useHistory } from 'react-router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const EditUserPage = () => {
    const params = useParams()
    const history = useHistory()
    const user = useSelector(state => state?.session?.user)
    const [userId, setUserId] = useState(0)
    const [userIdLoaded, setUserIdLoaded] = useState(false)
    const [contentLoaded, setContentLoaded] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editModalTitle, setEditModalTitle] = useState('')
    const [data, setData] = useState('')
    const [password, setPassword] = useState('')
    const [viewPassword, setViewPassword] = useState(false)
    const editModalButtonHandler = (title) => {
        setData('')
        setPassword('')
        setViewPassword(false)
        setEditModalTitle(title);
        setEditModal(true)
    }
    const imgErrorHandler = (e) => {
        e.target.onerror = null;
        e.target.src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    }
    useEffect(() => {setUserId(params?.userId)},[params])
    useEffect(() => {if (userId && user?.id){setUserIdLoaded(true)}}, [userId, user])
    useEffect(() => {if (userIdLoaded){if (+userId !== +user?.id){history.push('/')}else{setContentLoaded(true)}}}, [userIdLoaded])
    return (
    <>
    {contentLoaded?
        <div className='editUserPage'>
            <div className='editUserPreviewUser'>
                <img
                    src={user?.icon}
                    alt={user?.username}
                    onError={(e) => {imgErrorHandler(e)}}
                />
                <p>{user?.username}</p>
                <div className='editUserDelete'>Delete Account</div>

            </div>
            <div className='editUserForms'>
                <div className='editUserTop'>
                    <ul>
                        <li>
                            <div>
                                <p>Username</p>
                                <p>{user?.username}</p>
                            </div>
                            <div>
                                <p className='editUserDataButton' onClick={() => {editModalButtonHandler('User Name')}}>Edit</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Email</p>
                                <p>{user?.email}</p>
                            </div>
                            <div>
                                <p className='editUserDataButton' onClick={() => {editModalButtonHandler('Email')}}>Edit</p>
                            </div>
                        </li><li>
                            <div>
                                <p>Icon</p>
                                <p>{user?.icon}</p>
                            </div>
                            <div>
                                <p className='editUserDataButton' onClick={() => {editModalButtonHandler('Icon')}}>Edit</p>
                            </div>
                        </li><li>
                            <div>
                                <p>Password</p>
                                <p>*********</p>
                            </div>
                            <div>
                                <p className='editUserDataButton' onClick={() => {editModalButtonHandler('Password')}}>Edit</p>
                            </div>
                        </li>
                    </ul>
                </div>
                {editModal?
                <div className='editUserEditModal'>
                    <div className='top'>
                        <p>{`Change Your ${editModalTitle}`}</p>
                        <p>{`Enter a New ${editModalTitle} and Your Existing Password`}</p>
                    </div>
                    <div>
                        <div className='formData'>
                            <label>{editModalTitle}</label>
                            <input
                                type='text'
                                onChange={(e) => {setData(e.target.value)}}
                                value={data}
                                placeholder={`Enter Your New ${editModalTitle}`} >
                            </input>
                        </div>


                        <div className='formData'>
                            <label>Password</label>
                            <input
                                type={viewPassword?'text':'password'}
                                name='password' onChange={(e) => {setPassword(e.target.value)}}
                                value={password}
                                placeholder='Enter Your Password'>
                            </input>
                            <i
                                className={viewPassword?'fas fa-eye':'fas fa-eye-slash'}
                                onClick={() => {setViewPassword((current) => !current)}}>
                            </i>
                        </div>
                    </div>
                    <div className='editUserButtons'>
                        <p className='cancelEditUser'>Cancel</p>
                        <p className='submitEditUser'>Submit</p>
                    </div>
                </div>
            :null}


            </div>
        </div>
:null}
    </>
    )
}

export default EditUserPage
