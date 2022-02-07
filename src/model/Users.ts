import {model, Schema } from 'mongoose'
import Validator from "validator"
import { IUsers } from '../types/types'

const userSchema = new Schema <IUsers>({
    username:String,
    password: String,
    email: {
        type: String,
        validate: {
            validator: Validator.isEmail,
            message: "Email must be a valid email address"
        }
    },
    createdAt: String
}, {
    timestamps: true
})

const Users = model<IUsers>('Users', userSchema)
export default Users