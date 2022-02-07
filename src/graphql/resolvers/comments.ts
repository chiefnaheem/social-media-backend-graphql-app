import { UserInputError, AuthenticationError } from "apollo-server"
import verify from "../../utils/verify"
import Posts from "../../model/Posts"

export = {
    Mutation : {
        createComment: async (_: any, {postId, body}: any, context: any)=> {
            const {username}: any = verify(context)
            if(body.trim() === ''){
                throw new UserInputError('Empty comments', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                })
            }
            const post = await Posts.findById(postId)
            if(post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString(),

                })
                await post.save()
                return post;
            }
            throw new UserInputError('Post not found')
        },
        deleteComment: async (_: any, {postId, commentId}: any, context: any)=> {
            const {username}: any = verify(context)

            // console.log("my logged in data please check", username)
            const post: any = await Posts.findById(postId)
            if(post){
                const commentIndex: any = post.comments.findIndex((c: { id: any }) => c.id === commentId)
                console.log("my logged in data please check", post.comments[commentIndex].username)

                if(post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                }
                throw new AuthenticationError('Action not allowed')
            }
            throw new UserInputError('Post not found')
        },
        likePost: async(_: any, {postId}: any, context: any)=> {
            const {username}: any = verify(context)

            const post = await Posts.findById(postId)
            
            if(post) {
                if(post.likes.find(like => like.username === username)){
                    post.likes = post.likes.filter(like => like.username !== username)
                }
                post.likes.push({
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save()
                return post
            }
            throw new UserInputError('Post not found')
        }
    }
}

