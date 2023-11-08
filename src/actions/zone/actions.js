import { ActionTypes } from './action-types';

/// payload: the object which is assigned to this property contains the data which are sent
/// to the store
export const addZone = (Zone) => {
    return {
        type: ActionTypes.ADD_ZONE,
        payload: Zone
    }
}
export const getZone = (Zone) => {
    return {
        type: ActionTypes.GET_ZONE,
        payload: Zone

    }
}
export const updateZone = () => {
    return {
        type: ActionTypes.UPDATE_ZONE,

    }
}
