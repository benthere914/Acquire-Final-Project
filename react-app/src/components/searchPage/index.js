import { useEffect, useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { getSearchItems } from '../../store/items'
const SearchPage = () => {
    const items = useSelector(state => state.items)
    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    useEffect(() => {
        setQuery(params.query)
    }, [params])
    useEffect(() => {
        if (query){
            dispatch(getSearchItems(query.split('%').join("%25").split(" ").join("%20")))
        }
    }, [query])
    return (
    <>
        <div>
        <p>{query}</p>
        </div>
    </>
    )
}

export default SearchPage
