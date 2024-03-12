import React from "react";
import { Alert } from '@mui/material'

export const CustomAlert = (props) => {

    const {message} = props

    return (
        <Alert
        variant="outlined"
        severity="error"
        >{message}</Alert>
    )
}

export default CustomAlert