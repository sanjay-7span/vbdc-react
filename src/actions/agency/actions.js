import { ActionTypes } from './action-types';

/// payload: the object which is assigned to this property contains the data which are sent
/// to the store
export const addAgency = (Agency) => {
    return {
        type: ActionTypes.ADD_AGENCY,
        payload: Agency
    }
}
export const getAgency = (Agency) => {
    return {
        type: ActionTypes.GET_AGENCY,
        payload: Agency

    }
}
export const updateAgency = () => {
    return {
        type: ActionTypes.UPDATE_AGENCY,

    }
}

export const deleteAgency = () => {
    return {
        type: ActionTypes.DELETE_AGENCY,
    }
}