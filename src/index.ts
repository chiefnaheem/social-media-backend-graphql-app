import { ApolloServer} from "apollo-server"
import {PubSub} from "graphql-subscriptions"
require('dotenv').config();
import mongoose from "mongoose"

import resolvers from './graphql/resolvers'

import typeDefs from './graphql/typeDefs'

const pubsub = new PubSub();

const server = new ApolloServer({ typeDefs, resolvers, context: ({req}) => ({req, pubsub}) });

mongoose
  .connect(process.env.MONGODB as string)
  .then(() => {
      console.log('Connected to Database')
    return server.listen({ port: 7000 });
  })
  .then((res) => {
    console.log(`Server is running on port ${res.url}`);
  });
