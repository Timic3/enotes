import Sequelize from 'sequelize';

export default class Todo extends Sequelize.Model {
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
      checked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false
      },
    }, {
      hooks: {
      },
      sequelize
    })
  }
  static associate(models) {
    this.belongsTo(models.Note, {
      foreignKey: 'noteId',
      allowNull: false,
      onDelete: 'CASCADE'
    });
  }
}