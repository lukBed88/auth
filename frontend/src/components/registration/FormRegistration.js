import React from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { addAsyncUserData, createActionRegisterUser } from '../../actions/user'
import { useDispatch, useSelector } from 'react-redux'
import isEmail from 'validator/lib/isEmail'
import CustomAlert from '../messages/CustomAlert'

export const FormRegistration = (props) => {

    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData)
    
    // console.log('userData:',userData)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState:{ errors }
    } = useForm()

    const password = watch('password')
    console.log('password:',password)
    const repeatPassword = watch('repeatPassword')
    console.log('repeatPassword:',repeatPassword)

    const registerEmail = register('email',{
        required: {
            value: true,
            message: 'email nie może być pusty'
        },
        validate:(value) => isEmail(value) || 'Podaj poprawny email'
    })
    const registerPassword = register('password',{
        required: {
            value: true,
            message:'Hasło nie może być puste'
        },
        minLength:{
            value:8,
            message:'Hasło musi zawierać co najmniej 8 znaków'
        },
        validate:(password) => password === repeatPassword || 'hasła muszą pasować'
    })

    const registerRepeatPassword = register('repeatPassword',{
        required: {
            value: true
        },
        minLength: {
            value:8,
            message: 'Hasło musi zawierać co najmniej 8 znaków'
        },
        validate:(repeatPassword) => repeatPassword === password || 'hasła muszą pasować'
    })

    const onSubmit = handleSubmit(
        async(data,e) => {
            console.log('data:',data)
            dispatch(addAsyncUserData(data))
            reset()
        },
        (error) => {
            console.log('Error:',error)
        }
    )

    return (
        <form
        onSubmit={onSubmit}>
            <Stack spacing={2} sx={{width: '90%',maxWidth:'400px',margin:'auto'}}>
            <TextField size='small' variant='outlined' label='email' {...registerEmail}/>
            {errors?.email?.message ? <CustomAlert message={errors.email.message} /> : null}
            <TextField sx={{margin:'10px 0'}} size='small' variant='outlined' label='hasło' {...registerPassword}/>
            {errors?.password?.message ? <CustomAlert message={errors.password.message} /> : null}
            <TextField size='small' variant='outlined' label='powtórz hasło' {...registerRepeatPassword}/>
            {errors?.repeatPassword?.message ? <CustomAlert message={errors.repeatPassword.message} /> : null}
            <Button sx={{margin:'15px 0'}} variant='outlined' type='submit'>Zarejestruj się</Button>
            </Stack>
        </form>
    )

}

export default FormRegistration