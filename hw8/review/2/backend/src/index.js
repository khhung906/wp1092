import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Message from './resolvers/Message';
import ChatBox from './resolvers/ChatBox';
import mongo from './mongo'

const db = require("./db");
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Message,
    ChatBox,
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect();
const PORT = process.env.port || 4000;

server.start(PORT, () => {
  console.log(`The server is up on port 4000!`);
});
