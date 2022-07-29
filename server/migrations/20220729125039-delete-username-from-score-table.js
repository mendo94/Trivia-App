"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Scores", "username");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Score", "username", {
      type: Sequelize.STRING,
    });
  },
};
