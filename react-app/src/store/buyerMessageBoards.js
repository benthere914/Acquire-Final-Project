const GET_BUYER_MESSAGE_BOARDS = 'items/GET_BUYER_MESSAGE_BOARDS'

const loadBuyerMessageBoards = (buyerMessageBoards) => ({
    type: GET_BUYER_MESSAGE_BOARDS,
    payload: buyerMessageBoards
  });


export const getBuyerMessageBoards = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/buyerMessageBoards`)

    if (response.ok) {
        const buyerMessageBoards = await response.json()
        dispatch(loadBuyerMessageBoards(buyerMessageBoards));
    }
    return 'success'
  };


export default function reducer(state = {}, action) {
    switch (action.type) {
      case GET_BUYER_MESSAGE_BOARDS:
        return action.payload
      default:
        return state;
    }
  }
