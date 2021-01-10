module.exports = {
  production: {
    host: 'localhost',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 5432,
    dialect: 'postgres',
    timezone: 'Europe/Ljubljana',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  development: {
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    port: 25432,
    dialect: 'postgres',
    timezone: 'Europe/Ljubljana',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
};