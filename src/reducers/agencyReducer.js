import { ActionTypes } from "../actions/agency/action-types";
const initialState = {
    agency : [],
};

export default function agencyReducer(state = initialState, action) {
// console.log(action.payload);
// console.log(action.type);
// console.log(state);
  switch (action.type) {
    
    case ActionTypes.GET_AGENCY: {
      return {
        ...state,
        agency:action.payload
      }
    }
    case 'ADD_AGENCY': {
        return {
            ...state,
            agency:action.payload
          }
      }
    case 'UPDATE_AGENCY': {
        return {
            ...state,
            agency:action.payload
        }
    }
    default:
      return state
  }
}