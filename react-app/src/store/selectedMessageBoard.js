const SET_MESSAGE_BOARD = 'selected_item/SET_MESSAGE_BOARD'
const RESET = 'selected_item/RESET'

const reset_ = () => ({
    type: RESET
})
const setMessageBoard_ = (messageBoard) => ({
    type: SET_MESSAGE_BOARD,
    payload: messageBoard

  });

  export const reset = () => async (dispatch) => {
    dispatch(reset_())
  }
  export const setMessageBoard = (itemSelected, authorId, sellerId, buyerId, message, boardType) => async (dispatch) => {
    const result = await fetch('/api/messages/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            itemSelected,
            authorId,
            sellerId,
            buyerId,
            message
        })
    })
    const response = await result.json()
    if (result.ok){
        return dispatch(setMessageBoard_({itemSelected, response, boardType, sellerId, buyerId}))
    }
    else {
        return'bad message'
    }


  };


  export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_MESSAGE_BOARD:
            const tempState = {}
            tempState['messageBoardId'] = action.payload.response.messageBoardId
            tempState['boardType'] = action.payload.boardType
            tempState['sellerId'] = action.payload.sellerId
            tempState['buyerId'] = action.payload.buyerId
            tempState['title'] = action.payload.itemSelected
            return tempState
        case RESET:
            return {}
        default:
            return state;
    }
  }
