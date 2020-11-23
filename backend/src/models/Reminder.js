import Sequelize from 'sequelize';

export default class Opomnik extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      datum_opomnika: {
        type: Sequelize.DATE(50),
        allowNull: false,
        unique: false
      },
      repeatable: {
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
    this.belongsTo(models.Note);
  }
}
