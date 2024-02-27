"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Tickets", "user_name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Tickets", "event_name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Tickets", "event_date", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Tickets", "user_name");
    await queryInterface.removeColumn("Tickets", "event_name");
    await queryInterface.removeColumn("Tickets", "event_date");
  },
};
