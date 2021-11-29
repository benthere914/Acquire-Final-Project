import './index.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getSearchItems } from '../../store/items'
import ItemCards from '../itemCard'
const SearchPage = () => {
    const items = useSelector(state => Object.values(state.items))
    const params = useParams()
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('')
    const [itemsLoaded, setItemsLoaded] = useState(false)



    const [minIndex, setMinIndex] = useState(0)
    const [showItems, setShowItems] = useState([])
    const [buttons, setButtons] = useState([])
    const [selectedButton, setSelectedButton] = useState({})
    const [buttonsLoaded, setButtonsLoaded] = useState(false)

    useEffect(() => {
        setQuery(params?.query)
        setCategory(params?.category)
    }, [params])


    useEffect(() => {
        if (query && category){
            dispatch(getSearchItems(category.split('%').join("%25").split(" ").join("%20"), query.split('%').join("%25").split(" ").join("%20"))).then((e) => {
                if (e.message === 'success'){
                    setItemsLoaded(true)
                }
            })
        }
        else if (!query && category){
            dispatch(getSearchItems(category.split('%').join("%25").split(" ").join("%20"), '$$all$$')).then((e) => {
                if (e.message === 'success'){
                    setItemsLoaded(true)
                }
            })
        }
    }, [query, category])


    useEffect(() => {
        if (itemsLoaded){
            setButtons([])
            for (let i = 0; i < items.length; i += 15){
                    setButtons((prev) => [...prev, {min: i, max: i + 15}])
            }
            setButtonsLoaded(true)
            setItemsLoaded(false)
        }
    }, [itemsLoaded])


    useEffect(() => {
        if (buttonsLoaded){
            setSelectedButton(buttons[0])
        }
    }, [buttons, buttonsLoaded])

    useEffect(() => {
        setMinIndex(selectedButton?.min)
        setShowItems(() => items.slice(selectedButton?.min, selectedButton?.max))
    }, [selectedButton])

    const pageChangeHandler = (button) => {
        setMinIndex(button?.min);
        setShowItems(() => items.slice(button?.min, button?.max))
    }
    return (
    <>
    {buttonsLoaded &&
        <div className='searchPage'>
            <p className='searchTitle'>{category}</p>
            {items.length > 0?
            <>
            <ItemCards items={showItems}/>
            <div className='pages'>
                {buttons?.map((button) => (<p style={minIndex === button?.min? {color: 'white'}: null} className='selectedPage' key={button?.min} onClick={() => {pageChangeHandler(button)}}>{(button?.min / 15) + 1}</p>))}
            </div>
            </>
        :<p className='noItems'>There are no Items that meet the search criteria.</p>}
        </div>
    }
    </>
    )
}

export default SearchPage
