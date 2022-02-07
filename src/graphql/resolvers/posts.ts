import { AuthenticationError, UserInputError } from 'apollo-server';
import { Document, Types } from "mongoose";
import Posts from "../../model/Posts";
import { IPosts } from "../../types/types";
import verify from "../../utils/verify"

export = {
  Query: {
    async getPosts(_: any, __: any, context: any) {
      const user: any = verify(context);
      try {
        const posts: any = await Posts.find().sort({ createdAt: -1 });
        return posts;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    async getPost(_: any, { postId }: any, context: any) {
      const user: any = verify(context);
      try {
        const post = await Posts.findById(postId);
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_: any, { body }: any, context: any ) {
      const user: any = verify(context);
      if(body.trim() === '') {
          throw new Error('post must not be empty')
      }
      const newPost = new Posts({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      context.pubsub.publish('NEW_POST', {
          newPost: post
      })

      return post;
    },
    async updatePost(_: any, {postId, body}: any, context: any) {
      const user : any = verify(context)
      try{
        if(body.trim() === '') {
          return 'no updates was made'
        }
        const post: any = await Posts.findById(postId)
        if (user.username === post.username){

          const updatedPost = await Posts.findByIdAndUpdate(postId, {body}, {runValidators: true, new: true})
          return updatedPost
        }
        throw new AuthenticationError("Action not allowed");
      }catch(err: any) {
        throw new Error(err)
      }
    },
    async deletePost(_: any, { postId }: any, context: any) {
      const user: any = verify(context);
      try {
        const post: any = await Posts.findById(postId);
        console.log("post:", post, "user:", user);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } 
        throw new AuthenticationError("Action not allowed");
        
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
  Subscription : {
    newPost: {
        subscribe: (_: any, __: any, {pubsub}: any)=> pubsub.asyncIterator('NEW_POST')
    }
  }
};
