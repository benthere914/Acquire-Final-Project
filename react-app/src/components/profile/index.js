import './index.css'
import { useParams, useHistory } from 'react-router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersItems } from '../../store/items'
import ItemCards from '../itemCard'

const ProfilePage = () => {
    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()
    const [profileUserId, setProfileUserId] = useState(0)
    const [profileUser, setProfileUser] = useState({})
    const [isLoaded, setisLoaded] = useState(false)

    const items = useSelector(state => Object.values(state.items))
    const userId = useSelector(state => state.session.user.id)
    useEffect(() => {setProfileUserId(params?.userId)}, [params])
    useEffect(() => {
        const func = async () => {
            const response = await fetch(`/api/users/${profileUserId}`)
            const profileUser = await response.json()
            setProfileUser(profileUser)
        }
        func()
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
                        {userId === +profileUserId && +profileUserId !== +1?(
                        <div className='editAccount' onClick={() => {history.push(`/users/${userId}/edit`)}}>
                            <p >{'edit your account'}</p>
                        </div>



                        ):null}
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
