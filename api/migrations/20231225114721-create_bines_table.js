'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Bines', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        nro_bin: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        medio_de_pago: {
          type: Sequelize.STRING,
          allowNull: false
        },
        marca_tarjeta: {
          type: Sequelize.STRING,
          allowNull: false
        },
        nombre_banco: {
          type: Sequelize.STRING,
          allowNull: false
        },
        fecha: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
      
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Bines');
  }
};
