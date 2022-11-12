"use strict";

/** @type {import('sequelize-cli').Migration} */
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "John Doe",
          email: "test@email.com",
        },
      ],
      {}
    );
    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert(
        "Pastes",
        [
          {
            user_id: 1,
            content: makeid(300),
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
