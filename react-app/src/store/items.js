const GET_ITEMS = 'items/GET_ITEMS'


const loadItems = (items) => ({
    type: GET_ITEMS,
    payload: items
  });


  export const getTopItems = () => async (dispatch) => {
    const response = await fetch('/api/items/top')

    if (response.ok) {
        const items = await response.json()
        dispatch(loadItems(items));
    }
  };
