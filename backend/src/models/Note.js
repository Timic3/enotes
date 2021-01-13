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
      type: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        unique: false
      },
      color: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        unique: false
      },
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
      imageURL: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        unique: false
      },
      image: {
        type: Sequelize.BLOB('long'),
        allowNull: true,
        unique: false
      },
      reminderDate: {
        type: Sequelize.DATE(50),
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
      onDelete: 'CASCADE'
    });
    this.hasMany(models.Todo, {
      foreignKey: 'noteId',
      allowNull: false,
      onDelete: 'CASCADE'
    });
    this.belongsToMany(models.Label, {
      foreignKey: 'noteId',
      through: 'NoteLabels',
      allowNull: true,
      onDelete: 'CASCADE'
    });
  }
}
