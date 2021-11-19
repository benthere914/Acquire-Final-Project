const SET_MESSAGE_BOARD = 'selected_item/SET_MESSAGE_BOARD'


const setMessageBoard_ = (messageBoard) => ({
    type: SET_MESSAGE_BOARD,
    payload: messageBoard

  });


  export const setMessageBoard = (authorId, sellerId, buyerId, message, boardType) => async (dispatch) => {
    const result = await fetch('/api/messages/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            authorId,
            sellerId,
            buyerId,
            message
        })
    })
    const response = await result.json()
    return dispatch(setMessageBoard_({response, boardType, sellerId, buyerId}))


  };


  export default function reducer(state = {}, action) {
    switch (action.type) {
      case SET_MESSAGE_BOARD:
          const tempState = {}
          tempState['messageBoardId'] = action.payload.response.messageBoardId
          tempState['boardType'] = action.payload.boardType
          tempState['sellerId'] = action.payload.sellerId
          tempState['buyerId'] = action.payload.buyerId
        return tempState
      default:
        return state;
    }
  }
