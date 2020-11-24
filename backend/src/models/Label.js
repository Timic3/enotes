import Sequelize from 'sequelize';

export default class Label extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      priority: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: false
      },
      name: {
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
    this.belongsToMany(models.Note, {
      foreignKey: 'labelId',
      through: 'NoteLabels',
      allowNull: true,
      onDelete: 'CASCADE'
    });
  }
}
