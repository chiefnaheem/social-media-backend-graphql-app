import { IPosts } from '../types/types';
import {model, Schema} from 'mongoose'

const postSchema = new Schema <IPosts>({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
}, {
    timestamps: true
   }
)
const Posts = model<IPosts>('Posts', postSchema)
export default Posts;