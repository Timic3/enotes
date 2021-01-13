import Sequelize from 'sequelize';

export default class Drawing extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      clientX: {
        type: Sequelize.INTEGER(100),
        allowNull: false,
        unique: false
      },
      clientY: {
        type: Sequelize.INTEGER(100),
        allowNull: false,
        unique: false
      },
      image: {
        type: Sequelize.BLOB('long'),
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
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false,
      onDelete: 'CASCADE'
    });
  }
}
