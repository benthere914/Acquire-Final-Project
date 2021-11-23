const GET_ALL_OPTIONS = 'GET_ALL_OPTIONS/options'

const get_options = (type, payload) => {
    return {
        type: GET_ALL_OPTIONS,
        payload
    }
}

const getOptions = () => async (dispatch) => {
    const response = await fetch('/api/options')
    if (response.ok){
        const options = response.json()
        dispatch(get_options(options))
    }
}


export default function reducer(state = {}, action) {
    switch (action.type) {
      case GET_ALL_OPTIONS:
        return action.payload
      default:
        return state;
    }
  }
