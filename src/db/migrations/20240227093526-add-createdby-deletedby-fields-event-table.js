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
    await queryInterface.addColumn("Events", "created_by", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 7,
    });
    await queryInterface.addColumn("Events", "deleted_by", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Events", "created_by");
    await queryInterface.removeColumn("Events", "deleted_by");
  },
};
