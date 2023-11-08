
/// payload: the object which is assigned to this property contains the data which are sent
/// to the store

export const getProfile = (Profile) => {
    return {
        type: 'GET_PROFILE',
        payload: Profile

    }
}
export const updateProfile = () => {
    return {
        type: 'UPDATE_PROFILE',
    }
}