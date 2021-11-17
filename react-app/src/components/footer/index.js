import './index.css'
const Footer = () => {
    const openSiteHandler = (site) => site?window.open(site):null
    return (
    <>
    <div className='footer'>
        <p className='footerText'>Developed by Benjamin Rose</p>
            <img
                className='footerLinkedInLink footerLink'
                src='https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_black-512.png'
                alt='LinkedIn'
                onClick={() => {openSiteHandler('https://www.linkedin.com/in/benjamin-rose-0a6880202/')}}/>

            <img
                className='footerGitHubLink footerLink'
                src='https://cdn-icons-png.flaticon.com/512/25/25231.png'
                alt='GitHub'
                onClick={() => {openSiteHandler('https://github.com/benthere914/')}}/>
    </div>
    </>
    )
}

export default Footer
