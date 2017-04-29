const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const fsp = require('fs-promise');
const introspectionQuery = require('graphql/utilities').introspectionQuery;
const sleep = require('system-sleep');
// load config from .env file
dotenv.load();
const { SERVER_PORT } = process.env;

// introspect the schema from the graphql endpoint
const axiosSchema = url => axios.post(url, {
  query: introspectionQuery,
}).then(res => JSON.stringify(res.data));

sleep(2000);
axiosSchema(`http://localhost:${SERVER_PORT}/graphql`)
.then(json => fsp.writeFile(path.join(__dirname, '../../graphql.schema.json'), json))
.then(() => console.log('The graphql.schema.json file was successfully created'))
.catch(err => console.log(`There was an error fetching the GraphQL schema. ${err}`));
