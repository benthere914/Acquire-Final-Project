const GET_MESSAGE_BOARDS = 'items/GET_MESSAGE_BOARDS'

const loadMessageBoards = (messageBoards) => ({
    type: GET_MESSAGE_BOARDS,
    payload: messageBoards
  });


export const getMessageBoards = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/messageBoards/`)

    if (response.ok) {
        const messageBoards = await response.json()
        dispatch(loadMessageBoards(messageBoards));
    }
  };


export default function reducer(state = {}, action) {
    switch (action.type) {
      case GET_MESSAGE_BOARDS:
        return action.payload
      default:
        return state;
    }
  }
