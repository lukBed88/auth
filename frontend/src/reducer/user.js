import types from '../types/user'

const initState = {
    userData: [],
    userStatus: []
}

export const reducer = (state = initState, action) => {
    console.log(action)
    switch(action.type) {
        case types.ADD_USER_DATA:
            console.log(action)
        return {
            ...state,
            userData: state.userData.concat(action.payload.data.data)
        }
        case types.LOGIN_USER_DATA:
            console.log(action)
            return {
                ...state,
                userStatus: state.userStatus.concat(action.payload.data.data)
            }
        case types.LOGOUT_USER_DATA:
            state.userStatus = []
            return {
                ...state
            }
        default:
        return state
    }
}

export default reducer