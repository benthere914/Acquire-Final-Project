import './index.css'
import WarningModal from '../warningModal'
import { useParams, useHistory } from 'react-router'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import BetterImage from '../betterImage'
const EditUserPage = () => {
    const dispatch = useDispatch()
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
    const [deleteModal, setDeleteModal] = useState(false)
    const [error, setError] = useState('')
    const [badPassword, setBadPassword] = useState(false)
    const [badData, setBadData] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [dataError, setDataError] = useState('')
    const [deleteModalPassword, setDeleteModalPassword] = useState('')
    const [imgError, setImgError] = useState(false)

    const editModalButtonHandler = (title) => {
        setData('')
        setPassword('')
        setViewPassword(false)
        setEditModalTitle(title);
        setEditModal(true)
        setDataError('')
        setPasswordError('')
        setBadData(false)
        setBadPassword(false)
    }
    const cancelEditModalHandler = () => {
        setData('')
        setPassword('')
        setViewPassword(false)
        setEditModal(false)
    }

    const logoutHandler = async () => {
        cancelEditModalHandler()
        await dispatch(sessionActions.logout())
        history.push('/')
    }
    const deleteUserHandler = () => {
        dispatch(sessionActions.deleteAccount(userId, deleteModalPassword)).then((e) => {

            if (e === 'Incorrect Password'){
                setDeleteModalPassword('')
                setError('Icorrect Password')
            }else{logoutHandler()}
        }
    )}
    const imgErrorHandler = (e) => {
        e.target.onerror = null;
        e.target.src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    }

    const reset = (e) => {

        if (e){
            if (e?.password !== 'good'){
                setBadPassword(true)
                setPasswordError(` - ${e?.password}`)
            }else{
                setBadPassword(false)
                setPasswordError('')
            }
            if (e?.data !== 'good'){
                setBadData(true)
                setDataError(` - ${e?.data}`)
            }else{
                setBadData(false)
                setDataError('')
            }
        }else{
            setData('')
            setPassword('')
        }
    }

    const editUserHandler = () => {


        if (editModalTitle === 'User Name'){
            dispatch(sessionActions.updateUsername(userId, data, password)).then((e) => {reset(e)})
        }
        else if (editModalTitle === 'Email'){
            dispatch(sessionActions.updateUseremail(userId, data, password)).then((e) => {reset(e)})
        }
        else if (editModalTitle === 'Password'){
            dispatch(sessionActions.updateUserPassword(userId, data, password)).then((e) => {reset(e)})
        }
        else if (editModalTitle === 'Icon'){
            if (imgError){
                setBadData(true);
                setDataError(' - Invalid Image url')
                return
            }
            else{setBadData(false)}
            dispatch(sessionActions.updateUserIcon_(userId, data, password)).then((e) => {reset(e)})
        }
    }
    useEffect(() => {setUserId(params?.userId)},[params])
    useEffect(() => {if (userId && user?.id){setUserIdLoaded(true)}}, [userId, user])
    useEffect(() => {if (userIdLoaded){if ((+userId !== +user?.id) ||  user?.username.toLowerCase() === 'demo'){history.push('/')}else{setContentLoaded(true)}}}, [userIdLoaded])
    return (
    <>
    {contentLoaded?
        <div className='editUserPage'>
            <div className='editUserPreviewUser'>
                <BetterImage
                    classname={'imageCheck'}
                    src={data}
                    alt={user?.username}
                    setError={setImgError}
                />
                <img
                src={user?.icon}
                alt={user?.username}
                onError={(e) => {imgErrorHandler(e)}}
                />
                <p>{user?.username}</p>
                <div onClick={() => {setDeleteModal(true)}} className='editUserDelete'>Delete Account</div>

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
                                <p className='editUserDataButton' onClick={() => {editModalButtonHandler('User Name'); setData(user?.username)}}>Edit</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Email</p>
                                <p>{user?.email}</p>
                            </div>
                            <div>
                                <p className='editUserDataButton' onClick={() => {editModalButtonHandler('Email'); setData(user?.email)}}>Edit</p>
                            </div>
                        </li><li>
                            <div>
                                <p>Icon</p>
                                <p>{user?.icon}</p>
                            </div>
                            <div>
                                <p className='editUserDataButton' onClick={() => {editModalButtonHandler('Icon'); setData(user?.icon)}}>Edit</p>
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
                            <label>New {editModalTitle}{dataError}</label>
                            <input
                                style={badData?{border: 'solid 1px red'}:null}
                                type='text'
                                onChange={(e) => {setData(e.target.value);setBadData(false);setDataError('')}}
                                value={data}
                                placeholder={`Enter Your New ${editModalTitle}`} >
                            </input>
                        </div>


                        <div className='formData'>
                            <label>Current Password{passwordError}</label>
                            <input
                                style={badPassword?{border:'solid 1px red'}:null}
                                type={viewPassword?'text':'password'}
                                name='password' onChange={(e) => {setPassword(e.target.value);setBadPassword(false);setPasswordError('')}}
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
                        <p onClick={() => {cancelEditModalHandler()}} className='cancelEditUser'>Cancel</p>
                        <p className='submitEditUser' onClick={() => {editUserHandler()}}>Submit</p>
                    </div>
                </div>
            :null}


            </div>
        </div>
:null}
{deleteModal?(
            <WarningModal
                mainMessage='Are you sure you want to delete Your account? This can not be undone'
                mainButtonMessage={'Yes, I\'m sure. Delete My Account'}
                secondaryButtonMessage={'No. I\'m not sure.'}
                mainFunc={deleteUserHandler}
                setWarningModal={setDeleteModal}
                text={deleteModalPassword}
                setText={setDeleteModalPassword}
                error={error}
                setError={setError}
            />
        ):null}
    </>
    )
}

export default EditUserPage
