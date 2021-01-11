if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '/home/enotes-deploy/.env' });
}

console.log(process.env.NODE_ENV);
console.log(process.env.D_USERNAME);

module.exports = {
  production: {
    host: 'localhost',
    username: process.env.D_USERNAME,
    password: process.env.D_PASSWORD,
    database: process.env.D_DATABASE,
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