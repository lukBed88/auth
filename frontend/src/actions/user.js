import types from '../types/user'
import axios from 'axios'

export const createActionRegisterUser = (data) => ({
    type: types.ADD_USER_DATA,
    payload: { data }
})

export const createAsyncUser = (data) => async (dispatch) => {
    console.log(data)
}

export const createActionLoggingUser = (data) => ({
    type:types.LOGIN_USER_DATA,
    payload: { data }
})

export const createActionLogoutUser = (data) => ({
    type:types.LOGOUT_USER_DATA,
})

export const addAsyncUserData = (data) => async (dispatch) => {
    try {
        await axios.post('http://localhost:3001/user',data)
        await dispatch(createActionRegisterUser(data))
    }catch(error) {
        console.log('Błąd:',error)
    }
}   

export const getAsyncLoginStatus = (data) => async (dispatch) => {
    try {
        console.log(data)
        const loginData = await axios.post('http://localhost:3001/login', data);
        console.log(loginData)
        await dispatch(createActionLoggingUser(loginData))
    }catch(error) {
        console.log('Błąd:', error)
    }
}
export const getAsyncLogoutStatus = (data) => async (dispatch) => {
    try {
        const logoutUser = await axios.get('http://localhost:3001/logout')
        console.log('logoutUser:',logoutUser)
        await dispatch(createActionLogoutUser())
    }catch(e) {
        console.log('error:', e)
    }
}