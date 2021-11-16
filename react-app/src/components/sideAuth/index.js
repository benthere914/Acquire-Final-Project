import { useHistory } from 'react-router-dom'
import './index.css'
const SideAuth = () => {
    const history = useHistory()
    return (
    <>
        <div className='sideAuth'>
            <h1 onClick={() => {history.push('/')}}>Acquire</h1>

            <h2>Sell or buy.</h2>
            <h2>Almost anything.</h2>
            <img src='https://u-web-assets.mercdn.net/assets/auth-branding/12.webp' alt='Acquire'></img>
        </div>

    </>
    )
}

export default SideAuth
