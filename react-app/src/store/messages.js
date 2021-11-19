const GET_MESSAGES = 'items/GET_MESSAGES'

const loadMessages = (messages) => ({
    type: GET_MESSAGES,
    payload: messages
  });


export const getMessages = (messageBoardId) => async (dispatch) => {
    const response = await fetch(`/api/messageBoards/${messageBoardId}messages`)

    if (response.ok) {
        const messages = await response.json()
        dispatch(loadMessages(messages));
    }
  };


export default function reducer(state = {}, action) {
    switch (action.type) {
      case GET_MESSAGES:
        return action.payload
      default:
        return state;
    }
  }
