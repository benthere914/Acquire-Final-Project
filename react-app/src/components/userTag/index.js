import { useHistory } from 'react-router';
import './index.css'


const UserTag = ({user, extraText, extraFontSize, extraFontWeight}) => {

    const imgErrorHandler = (e) => {
        e.target.onerror = null;
        e.target.src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    }
    const history = useHistory()
    return (
    <>
    <div className='userTagParent'>
        {extraText?<p style={{margin: '0px 15px 0px 0px', fontSize: extraFontSize, fontWeight: extraFontWeight}}>{extraText}</p>:null}
        <div className='userTag' onClick={() => {history.push(`/users/${user?.id}`)}}>
            <img
                src={user?.icon}
                onError={(e) => {imgErrorHandler(e)}}/>
            <p>{user?.username}</p>
        </div>
    </div>
    </>
    )
}

export default UserTag
