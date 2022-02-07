import jwt from 'jsonwebtoken'
import {AuthenticationError} from 'apollo-server'

export = (context: any) => {
    const authHeader = context.req.headers.authorization

    if(authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token, process.env.SECRET_KEY as string)
                return user
            }catch(err){
                throw new AuthenticationError('Token has expired or invalid')
            }
        }
        throw new AuthenticationError('Authentication token must be \' Bearer [token]')
    }
    throw new AuthenticationError('Authentication header must be provided')
}