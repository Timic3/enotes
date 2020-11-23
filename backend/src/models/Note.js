import Sequelize from 'sequelize';

export default class Note extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: false
      },
      text: {
        type: Sequelize.STRING(1000),
        allowNull: true,
        unique: false
      },
    }, {
      hooks: {
      },
      sequelize
    })
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false,
    });
    this.hasMany(models.Todo, {
      foreignKey: 'todoId',
      allowNull: true,
    });
    this.belongsTo(models.Oznaka);
    this.hasMany(models.Opomnik, {
      foreignKey: 'opomnikId',
      allowNull: true,
    });
  }
}
