import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { getAsyncLogoutStatus } from '../../actions/user'

export const Logout = (props) => {
        
    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(getAsyncLogoutStatus())
    }
    
    return (
        <Button
        onClick= {onClick}
        >Wyloguj</Button>
    )
}

export default Logout