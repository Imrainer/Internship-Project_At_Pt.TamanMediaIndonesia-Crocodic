'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('group_member', {  
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     clientId: { type: Sequelize.INTEGER,
     references: {
     model: 'client',
      key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'},

      groupId: { type: Sequelize.INTEGER,
        references: {
        model: 'group',
         key: 'id'
         },
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE'},
    
 
}); 
},

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     *
     */ await queryInterface.dropTable('group_member');
  }
};
