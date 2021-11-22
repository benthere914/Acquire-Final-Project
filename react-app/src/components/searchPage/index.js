import { useEffect, useState } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { getSearchItems } from '../../store/items'
import ItemCards from '../itemCard'
const SearchPage = () => {
    const items = useSelector(state => Object.values(state.items))
    const params = useParams()
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('')
    useEffect(() => {
        setQuery(params?.query)
        setCategory(params?.category)
    }, [params])
    useEffect(() => {
        if (query && category){
            console.log('both')
            dispatch(getSearchItems(category.split('%').join("%25").split(" ").join("%20"), query.split('%').join("%25").split(" ").join("%20")))
        }
        else if (!query && category){
            console.log(category)
            dispatch(getSearchItems(category.split('%').join("%25").split(" ").join("%20"), '$$all$$'))
        }
    }, [query, category])
    return (
    <>
        <div>
            <ItemCards items={items}/>
        </div>
    </>
    )
}

export default SearchPage
