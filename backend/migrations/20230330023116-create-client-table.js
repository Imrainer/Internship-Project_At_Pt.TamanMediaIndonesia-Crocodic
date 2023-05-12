'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('client', {  
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
      nama: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    nomor_hp: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
   industri: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
   bulan: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
  });
},
  async down (queryInterface, Sequelize) {
  
   await queryInterface.dropTable('client');
     
  }
};
