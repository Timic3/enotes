import Sequelize from 'sequelize';

export default class Oznaka extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      prioriteta: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: false
      },
      imeOznake: {
        type: Sequelize.STRING(1000),
        allowNull: true,
        unique: true
      },
    }, {
      hooks: {
      },
      sequelize
    })
  }
  static associate(models) {
    this.hasMany(models.Note, {
      foreignKey: 'noteId',
      allowNull: true,
    });
  }
}
