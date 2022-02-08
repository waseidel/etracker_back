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

  const MONGO_DB = process.env.MONGO_DB;
  const MONGO_USER = process.env.MONGO_USER;
  const MONGO_PASS = process.env.MONGO_PASS;
  const MONGO_URI = process.env.MONGO_URI;

  const CONN = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}/${MONGO_DB}?retryWrites=true&w=majority`
  server.applyMiddleware({ app });

  try {
    console.info(`Connecting to MongoDB... `);
    await mongoose.connect(CONN);
    console.info(`Connected to MongoDB.`);
  } catch (error) {
    console.error(error);
  }

  const PORT = process.env.PORT || 4000;

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

await startServer();
