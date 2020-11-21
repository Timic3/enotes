module.exports = {
  development: {
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
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