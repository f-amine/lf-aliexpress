import knex from 'knex';
import config from '../knexfile';

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];

// Create and export the database connection
const db = knex(environmentConfig);

export default db;
