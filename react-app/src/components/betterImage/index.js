const BetterImage = ({classname,src, alt, error, setError }) => {
    const imgErrorHandler = (e) => {
        e.target.onerror = null;
        e.target.src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
    }
    const loadHandler = (e) => {
        if (e.target.src === 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'){
            setError(true)
        }
        else{
            setError(false)
        }

    }
    return (

    <>
    <img
        className={classname}
        src={src}
        alt={alt}
        onError={(e) => {imgErrorHandler(e)}}
        onLoad={(e) => {loadHandler(e)}}
    />
    </>
    )
}

export default BetterImage
