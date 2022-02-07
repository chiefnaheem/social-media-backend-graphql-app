
import  bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {UserInputError} from "apollo-server"

import {validateLoginInput} from '../../utils/validators'
import {validateRegisterInput} from "../../utils/validators"

import Users from '../../model/Users'

function generateToken (user: any) {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.SECRET_KEY as string, {expiresIn: "3d"})
    return token;
}

export = {
    Mutation: {
        async login (_: any, {username, password}: any){
            const {errors, valid} = validateLoginInput(username, password)
            if(!valid) {
                throw new UserInputError('Errors', {errors})
            }

            const user: any = await Users.findOne({username})
            if(!user) {
                errors.general = "User not found"
                throw new UserInputError("User does not exist", {errors})
            }
            const match = await bcrypt.compare(password, user.password)
            if(!match) {
                throw new UserInputError("Wrong login credentials", {errors})
            }
            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_: any, {registerInput: {username, email, password, confirmPassword}}: any, context: any, info: any){
            // validate user data
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid) {
                throw new UserInputError('Errors', {errors})
            }
            const user = await Users.findOne({username})
            if(user){
                throw new UserInputError("username is taken", {
                    errors: {
                        username: "This username is taken"
                    }
                })
            }
            password = await bcrypt.hash(password, 12)
            const newUser = new Users ({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
            const data: any = await newUser.save()
            const token = generateToken(data)
            
            return {
                ...data._doc,
                id: data._id,
                token
            }
        }
    }
}