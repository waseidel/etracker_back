import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import typeDefs from './src/schema/type-defs.js';
import resolvers from './src/resolvers/resolvers.js';

async function startServer() {
  const app = express();
  app.use(cors());

  dotenv.config();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await server.start();

  const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
  const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
  const MONGODB_HOST = process.env.MONGODB_HOST
  const MONGODB_DATABASE = process.env.MONGODB_DATABASE
  const MONGODB_SERVERNAME = `${MONGODB_DATABASE}?retryWrites=true&w=majority`

  const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_SERVERNAME}`

  server.applyMiddleware({ app });

  try {
    console.info(`Connecting to MongoDB... `);
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info(`Connected to MongoDB.`);
  } catch (error) {
    console.error(error);
  }

  const PORT = process.env.PORT || 4000;

  app.listen({ port: PORT }, () =>
    console.info(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

await startServer();
