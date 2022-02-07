import { validateRegister } from '../types/types';

export const validateRegisterInput = (
    username: string,
    email: string,
    password: string, 
    confirmPassword: any
)=> {
    const errors: any = {};
    if(username.trim() === ""){
        errors.username = "username must not be empty"
    }
    if(email.trim() === ""){
        errors.username = "email must not be empty"
    }
    if(password === ""){
        errors.password = "password must not be empty"
    } else if(password !== confirmPassword){
        errors.confirmPassword = "passwords must match"
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
    
    
}

export const validateLoginInput = (username: string, password: string) => {
    const errors: any = {};
    if(username.trim() === "") {
        errors.username = "Username must not be empty"
    }
    if(password === "") {
        errors.username = "password must not be empty"
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}