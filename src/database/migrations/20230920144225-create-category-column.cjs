'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      'Categories',
      'path',
      {
        type: Sequelize.STRING, // Corrigindo o tipo de dados para STRING
        //allowNull: true, // Defina como true ou false com base nos requisitos
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Categories', 'path');
  }
};

