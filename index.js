import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import typeDefs from './src/schema/type-defs.js';
import resolvers from './src/resolvers/resolvers.js';

async function startServer() {
  const app = express();
  app.use(cors());

  const httpServer = http.createServer(app);

  dotenv.config();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => ({ req }),
  });

  await server.start();

  server.applyMiddleware({ app });

  try {
    console.info(`Connecting to MongoDB... `);
    await mongoose.connect(process.env.MONGO_DB);
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
