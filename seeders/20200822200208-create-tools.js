"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tools",
      [
        {
          name: "VS Code",
          image: "http://images.com",
          url: "https://code.visualstudio.com/",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Node JS",
          image: "http://images.com",
          url: "https://nodejs.org/en/",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tools", null, {});
  },
};
