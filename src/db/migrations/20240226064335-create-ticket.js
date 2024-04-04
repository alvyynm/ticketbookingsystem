"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Events",
          key: "id",
        },
      },
      ticket_type: {
        type: Sequelize.ENUM("vip", "regular"),
      },
      reservation_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      ticket_price: {
        type: Sequelize.FLOAT,
      },
      ticket_serial: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tickets");
  },
};
