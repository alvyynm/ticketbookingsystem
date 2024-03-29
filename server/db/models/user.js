"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Ticket, {
        foreignKey: "user_id",
        allowNull: false,
        onDelete: "SET NULL",
      });
      // Define many-to-many association with Event
      this.belongsToMany(models.Event, {
        through: "UserEvents", // Name of the junction table
        foreignKey: "user_id", // Foreign key in UserEvents referencing User
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_role: {
        type: DataTypes.ENUM,
        values: ["admin", "user"],
      },
      user_password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
      // explictly declare the table name
      tableName: "Users",
    }
  );
  return User;
};
