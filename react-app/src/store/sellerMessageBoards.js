const GET_SELLER_MESSAGE_BOARDS = 'items/GET_SELLER_MESSAGE_BOARDS'

const loadSellerMessageBoards = (sellerMessageBoards) => ({
    type: GET_SELLER_MESSAGE_BOARDS,
    payload: sellerMessageBoards
  });


export const getSellerMessageBoards = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/sellerMessageBoards`)

    if (response.ok) {
        const sellerMessageBoards = await response.json()
        dispatch(loadSellerMessageBoards(sellerMessageBoards));
    }
    return 'success'
  };


export default function reducer(state = {}, action) {
    switch (action.type) {
      case GET_SELLER_MESSAGE_BOARDS:
        return action.payload
      default:
        return state;
    }
  }
