"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EventArchive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventArchive.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      event_name: DataTypes.STRING,
      event_description: DataTypes.TEXT,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      max_attendees: DataTypes.INTEGER,
      ticket_price_vip: DataTypes.FLOAT,
      ticket_price_regular: DataTypes.FLOAT,
      created_by: DataTypes.INTEGER,
      deleted_by: DataTypes.INTEGER,
      deleted_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Event",
      underscored: true,
      // explictly declare the table name
      tableName: "EventArchives",
    }
  );
  return EventArchive;
};
