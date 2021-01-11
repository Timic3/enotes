import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize from 'sequelize';

const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(join(__dirname, '..', 'config', 'database.js'))[env];
console.log(config);
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = Object.assign({}, ...readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .map((file) => {
    const model = require(join(__dirname, file)).default;
    return {
      [model.name]: model.init(sequelize),
    };
  }));

Object.keys(models).forEach((model) => {
  if (typeof models[model].associate === 'function') {
    models[model].associate(models);
  }
});

models.sequelize = sequelize;

export default models;
