import './index.css'


const UserTag = ({user}) => {

    const imgErrorHandler = (e) => {
        e.target.onerror = null;
        e.target.src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    }
    return (
    <>
        <div className='userTag'>
            <img
                src={user?.icon}
                onError={(e) => {imgErrorHandler(e)}}/>
            <p>{user?.username}</p>
        </div>
    </>
    )
}

export default UserTag
