import { SET_ERROR, HIDE_ERROR, GET_ERROR, SET_SUCCESS } from './messageType';

/// payload: the object which is assigned to this property contains the data which are sent
/// to the store
export const setError = (error) => {
    return {
        type: SET_ERROR,
        message: error
    }
}

export const setSuccess = (success) => {
    console.log('action '+success);
    return {
        type: SET_SUCCESS,
        message: success
    }
}
export const getError = (error) => {
    return {
        type: GET_ERROR,
        payload: error

    }
}
export function hideError(){
    return {
        type: HIDE_ERROR
    }
}
