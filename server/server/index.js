const dotenv = require('dotenv');
const postgraphql = require('postgraphql').postgraphql;
const cors = require('cors');
const express = require('express');

// Initialize express server
const server = express();

// Integrate `CORS` to permit cross-domain requests
server.use(cors());

const clearConsole = require('../scripts/clearConsole');

// Load the config from .env file.
dotenv.load();
const {
  SERVER_PORT,
  DB_STRING,
  DB_SCHEMA,
  DB_DEFAULT_ROLE,
  SECRET,
  TOKEN,
} = process.env;

// Mount the PostGraphQL as middleware.
server.use(postgraphql(DB_STRING, DB_SCHEMA, {
  pgDefaultRole: DB_DEFAULT_ROLE,
  classicIds: false,
  graphiql: true,
  jwtSecret: SECRET,
  jwtPgTypeIdentifier: TOKEN,
}));

// Redirect root requests to `/graphql` path.
server.use('/', (req, res) => res.redirect('/graphql'));

// Start the server.
server.listen(SERVER_PORT, () => {
  clearConsole();
  console.log(`Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${SERVER_PORT}\n`);
});
