import './index.css'
import UserTag from '../userTag'
import { useParams, useHistory } from 'react-router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersItems } from '../../store/items'
import ItemCards from '../itemCard'
import SendMessageButton from '../ sendMessageButton'
import NewMessageModal from "../newMessageModal"

const ProfilePage = () => {
    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()
    const [profileUserId, setProfileUserId] = useState(0)
    const [profileUser, setProfileUser] = useState({})
    const [isLoaded, setisLoaded] = useState(false)
    const [newMessageModal, setNewMessageModal] = useState(false)

    const items = useSelector(state => Object.values(state.items))
    const userId = useSelector(state => state.session.user.id)
    const user = useSelector(state => state.session.user)
    useEffect(() => {setProfileUserId(params?.userId)}, [params])
    useEffect( async () => {
        const response = await fetch(`/api/users/${profileUserId}`)
        const profileUser = await response.json()
        setProfileUser(profileUser)
    }, [profileUserId])

    useEffect(() => {dispatch(getUsersItems(profileUserId))}, [profileUser])
    useEffect(() => {if (items && profileUser){setisLoaded(true)}}, [items, profileUser])
    return (
    <>
        {isLoaded?
            <>
            <div className='userProfile'>

                    <div className='userTagParent'>
                        <div className='userTag_' onClick={() => {history.push(`/users/${profileUser?.id}`)}}>
                            <img
                                alt='user'
                                src={profileUser?.icon}
                                />
                            <p>{profileUser?.username}</p>
                        </div>
                        {/* {userId === +profileUserId && +profileUserId !== +1?(<p onClick={() => {history.push(`/users/${userId}/edit`)}} className='editAccountButton'>Edit your account</p>):null} */}
                        {userId === +profileUserId && +profileUserId !== +1?(
                        <div className='editAccount' onClick={() => {history.push(`/users/${userId}/edit`)}}>
                            <p >{'edit your account'}</p>
                        </div>



                        ):null}


                        {userId !== +profileUserId?(
                            <div className='messageTag'>
                                <p onClick={() => {setNewMessageModal(true)}} className=''>{`Message`}</p>
                            </div>
                        ):null}
                        {newMessageModal?<NewMessageModal setNewMessageModal={setNewMessageModal} receivingUser={profileUserId}/>:null}
                    </div>

                <p className='ItemsIntroduction'>{`Items ${profileUser?.username} has for sale`}</p>
                <ItemCards items={items}/>
            </div>

            </>
        :null}
    </>
    )
}

export default ProfilePage
