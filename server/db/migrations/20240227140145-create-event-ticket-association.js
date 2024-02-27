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
    await queryInterface.addConstraint("Tickets", {
      fields: ["event_id"],
      type: "foreign key",
      name: "fk_event_id",
      references: {
        table: "Events",
        field: "id",
      },
      onDelete: "CASCADE", // Set onDelete behavior
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Remove the foreign key constraint
    await queryInterface.removeConstraint("Tickets", "fk_event_id");
  },
};
