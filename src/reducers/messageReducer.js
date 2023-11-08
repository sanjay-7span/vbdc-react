const initialState = {
    message : null,
    isOpen: false
};

export default function messageReducer(state = initialState, action) {
  // console.log(state);
  // console.log(action);
  const { message } = action;
  if(action.type === 'SET_ERROR'){
    // console.log(message);
    return {
      message: message,
      isOpen: false
    }
  } else if(action.type === 'SET_SUCCESS'){
    // console.log(message);
    return {
      message: message,
      isOpen: false
    }
  } else if(action.type === 'HIDE_ERROR'){
    return {
      error: null,
      isOpen: false
    }
  }
  return state;
}