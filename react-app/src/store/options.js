const LOAD_ALL_OPTIONS = 'LOAD_ALL_OPTIONS/options'

const load_options = (payload) => {
    return {
        type: LOAD_ALL_OPTIONS,
        payload
    }
}

const loadOptions = () => async (dispatch) => {
    const response = await fetch('/api/options')
    if (response.ok){
        const options = response.json()
        dispatch(load_options(options))
    }
}


export default function reducer(state = {}, action) {
    switch (action.type) {
      case LOAD_ALL_OPTIONS:
        return action.payload
      default:
        return state;
    }
  }
