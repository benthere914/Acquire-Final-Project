const LOAD_ALL_OPTIONS = 'LOAD_ALL_OPTIONS/options'

const load_options = (payload) => {
    return ({type: LOAD_ALL_OPTIONS,payload})

}


export const loadOptions = () => async (dispatch) => {
    const response = await fetch('/api/options')
    if (response.ok){
        const options = await response.json()
        dispatch(load_options(options))
    }
}


export default function reducer(state = {}, action) {
    switch (action.type) {
      case LOAD_ALL_OPTIONS:
        return action.payload.options
      default:
        return state;
    }
  }
