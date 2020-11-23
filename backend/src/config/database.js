module.exports = {
  production: {
    dialect: 'sqlite',
    storage: ':memory:',
    dialectOptions: {
      timezone: 'Etc/GMT0',
    },
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
    dialectOptions: {
      timezone: 'Etc/GMT0',
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
};