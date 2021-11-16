import { useHistory } from 'react-router'
import './index.css'

const AuthSwitch = ({string, link}) => {
    const history = useHistory()

    return (
    <>
        <div className='authSwitch'>
            <p>{string}</p>
            <p>Click <span onClick={() => {history.push(link)}} className='authSwitchLink'>Here</span></p>
        </div>
    </>
    )
}

export default AuthSwitch
