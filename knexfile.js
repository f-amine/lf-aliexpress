// Update with your config settings.
require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DbHost,
      user:     process.env.DbUser,
      database: process.env.DbName,
      password: process.env.DbPass,
      port: process.env.DbPort
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DbHost,
      user:     process.env.DbUser,
      database: process.env.DbName,
      password: process.env.DbPass,
      port: process.env.DbPort
    },
    pool: {
      min: 2,
      max: 10
    },
  }

}
