import './index.css'
import { useState } from 'react';
const WarningModal = ({message}) => {
    const [password, setPassword] = useState('');
    const [viewPassword, setViewPassword] = useState(false)
    return (
    <>
        <div className='warningModal'>
            <p>{message}</p>
            <div className='warningModalPasswordBox'>
                <input
                    type={viewPassword?'text':'password'}
                    name='password' onChange={(e) => {setPassword(e.target.value)}}
                    value={password}
                    placeholder='Enter your password'>
                </input>
                <i
                    className={viewPassword?'fas fa-eye':'fas fa-eye-slash'}
                    onClick={() => {setViewPassword((current) => !current)}}>
                </i>
            </div>
            <button>Yes I'm Sure. Delete This Post</button>
        </div>
    </>
    )
}

export default WarningModal
