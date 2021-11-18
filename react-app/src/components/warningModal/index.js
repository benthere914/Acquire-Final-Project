import './index.css'
import { useState } from 'react';
const WarningModal = ({mainMessage, mainButtonMessage, secondaryButtonMessage, mainFunc, setWarningModal, text, setText}) => {
    const [viewPassword, setViewPassword] = useState(false)
    return (
    <>
        <div className='warningModal'>
            <p>{mainMessage}</p>
            <div className='warningModalPasswordBox'>
                <input
                    type={viewPassword?'text':'password'}
                    name='password' onChange={(e) => {setText(e.target.value)}}
                    value={text}
                    placeholder='Enter your password'>
                </input>
                <i
                    className={viewPassword?'fas fa-eye':'fas fa-eye-slash'}
                    onClick={() => {setViewPassword((current) => !current)}}>
                </i>
            </div>
            <button onClick={() => {mainFunc()}}>{mainButtonMessage}</button>
            <button onClick={() => {setWarningModal(false)}}>{secondaryButtonMessage}</button>
        </div>
    </>
    )
}

export default WarningModal
