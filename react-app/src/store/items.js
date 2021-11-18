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

  export const getUsersItems = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/items`)

    if (response.ok) {
        const items = await response.json()
        dispatch(loadItems(items));
    }
  };


  export default function reducer(state = {}, action) {
    switch (action.type) {
      case GET_ITEMS:
        return action.payload
      default:
        return state;
    }
  }
