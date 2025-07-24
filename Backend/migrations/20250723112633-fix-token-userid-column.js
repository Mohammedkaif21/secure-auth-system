'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the wrongly named column
    await queryInterface.removeColumn('Tokens', 'user_id');

    // Add the correct column
    await queryInterface.addColumn('Tokens', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    // Rollback logic if needed
    await queryInterface.removeColumn('Tokens', 'user_id');
    await queryInterface.addColumn('Tokens', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  }
};
