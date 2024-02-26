"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      event_name: DataTypes.STRING,
      event_description: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      max_attendees: DataTypes.INTEGER,
      ticket_price_vip: DataTypes.FLOAT,
      ticket_price_regular: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Event",
      underscored: true,
    }
  );
  return Event;
};