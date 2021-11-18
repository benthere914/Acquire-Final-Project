import './index.css'
import { useState } from 'react';
const WarningModal = ({mainMessage, mainButtonMessage, secondaryButtonMessage, mainFunc, setWarningModal, text, setText, error, setError}) => {
    const [viewPassword, setViewPassword] = useState(false)
    return (
    <>
        <div className='warningModal'>
            <p>{mainMessage}</p>
            <div className='warningModalPasswordBox'>
                {error?<p className='invalidPasswordWarningModal'>Invalid Password</p>:null}
                <input
                    type={viewPassword?'text':'password'}
                    name='password' onChange={(e) => {setText(e.target.value);setError('')}}
                    value={text}
                    placeholder='Enter your password'
                    style={error?{borderColor: 'red'}:null}
                    >

                </input>
                <i
                    className={viewPassword?'fas fa-eye':'fas fa-eye-slash'}
                    onClick={() => {setViewPassword((current) => !current)}}>
                </i>
            </div>
            <button onClick={() => {mainFunc()}}>{mainButtonMessage}</button>
            <button onClick={() => {setError('');setWarningModal(false)}}>{secondaryButtonMessage}</button>
        </div>
    </>
    )
}

export default WarningModal
