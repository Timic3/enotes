import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(125),
        allowNull: false,
        unique: true
      }
    }, {
      hooks: {
        async beforeCreate(user) {
          const passwordHash = await bcrypt.hash(user.password, 10);
          user.password = passwordHash;
        }
      },
      sequelize
    })
  }
  static associate(models) {
    this.hasMany(models.Note, {
      foreignKey: 'noteId',
    });
  }
}
