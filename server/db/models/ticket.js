"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  Ticket.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
      ticket_type: {
        type: DataTypes.ENUM,
        values: ["vip", "regular"],
      },
      reservation_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      ticket_price: DataTypes.FLOAT,
      ticket_serial: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ticket",
      underscored: true,
      // explictly declare the table name
      tableName: "Tickets",
    }
  );
  return Ticket;
};
