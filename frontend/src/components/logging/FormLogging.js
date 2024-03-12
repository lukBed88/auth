import React from "react";
import { Button, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import isEmail from 'validator/lib/isEmail'
import CustomAlert from "../messages/CustomAlert";
import { getAsyncLoginStatus } from "../../actions/user";
import { Navigate } from "react-router-dom";

export const FormLogging = () => {

    const dispatch = useDispatch()
    const auth = useSelector((state) => state.userStatus)
    console.log('USE_SELECTOR?:',auth)

//     <Routes>
//     {
//     auth[0]?.status === 200 ? 
//     <Navigate to='/home'/>: null
//   }
//       </Routes>

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const registerEmail = register('email',{
        required: {
            value:true,
            message: 'Wpisz email'
        },
        validate: (password) => isEmail(password) || 'wpisz poprawny email'
    })
   
    const registerPassword = register('password',{
        required: {
            value:true,
            message: 'Wpisz hasło'
        },
        minLength: {
            value: 8,
            message: 'Hasło musi zawierać co najmniej 8 znaków'
        }
    })

    const onSubmit = handleSubmit(
        async(data,e) => {
            console.log(data)
            dispatch(getAsyncLoginStatus(data))
        },
        (errors,e) => {
            console.log(errors)
        }
    )

    return (
    <>
        <form
        onSubmit={onSubmit}>
            <Stack spacing={2} sx={{width: '90%',maxWidth:'400px',margin:'auto'}}>
            <TextField size='small' variant='outlined' label='email' {...registerEmail}/>
            {errors.email?.message ? <CustomAlert message={errors.email.message}/> : null}
            <TextField sx={{margin:'10px 0'}} size='small' variant='outlined' label='hasło' {...registerPassword}/>
            {errors.password?.message ? <CustomAlert message={errors.password.message}/> : null}
            <Button sx={{margin:'15px 0'}} variant='outlined' type='submit'>Zaloguj się</Button>
            </Stack>
        </form>
    </>
    )

}

export default FormLogging