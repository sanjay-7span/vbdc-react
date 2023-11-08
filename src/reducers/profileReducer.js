const initialState = {
    profile : [],
};

export default function profileReducer(state = initialState, action) {
// console.log(action.payload);
// console.log(action.type);
// console.log(state);
  switch (action.type) {
    
    case 'GET_PROFILE': {
      return {
        ...state,
        profile:action.payload
      }
    }
    case 'UPDATE_PROFILE': {
        return {
            ...state,
            profile:action.payload
        }
    }
    default:
      return state
  }
}