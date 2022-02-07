import {gql} from "apollo-server"

export = gql`
    type Posts{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }
    type Users{
        id: ID!,
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getPosts: [Posts]
        getPost(postId: ID): Posts!
    }
    type Mutation {
        register (registerInput: RegisterInput) : Users!
        login(username: String!, password: String) : Users! 
        createPost(body: String): Posts!
        updatePost(body: String, postId: String): Posts!
        deletePost(postId: ID): String!
        createComment(postId: String!, body: String!) : Posts!
        deleteComment(postId:ID!, commentId: ID!) : Posts!
        likePost(postId:ID!): Posts!
    }
    type Subscription {
        newPost: Posts!
    }
`;