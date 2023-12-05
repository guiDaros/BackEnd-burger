// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {

//     await queryInterface.addColumn('products', 'offer', {
//       id: Sequelize.BOOLEAN,
//       defaultValue: false,
//       allowNull: false
//     });

//   },

//   async down(queryInterface, Sequelize) {
    
//     await queryInterface.removeColumn('products', 'offer');
//   }
// };


'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'offer', {
      type: Sequelize.BOOLEAN, // Usar 'type' em vez de 'id'
      defaultValue: false,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'offer');
  }
};
