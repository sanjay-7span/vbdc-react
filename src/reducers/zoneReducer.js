import { ActionTypes } from "../actions/zone/action-types";
const initialState = {
    zone : [],
};

export default function zoneReducer(state = initialState, action) {
console.log(action.payload);
console.log(action.type);
console.log(state);
  switch (action.type) {
    
    case ActionTypes.GET_ZONE: {
      return {
        ...state,
        zone:action.payload
      }
    }
    case 'ADD_ZONE': {
        return {
            ...state,
            zone:action.payload
          }
      }
    case 'UPDATE_ZONE': {
        return {
            ...state,
            zone:action.payload
        }
    }
    default:
      return state
  }
}