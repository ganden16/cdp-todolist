"use strict";

/** @type {import('sequelize-cli').Migration} */

const fs = require("fs");
let json = fs.readFileSync("data/user.json");
let data = JSON.parse(json);

module.exports = {
	async up(queryInterface, Sequelize) {
		var users = [];
		data.forEach((user) => {
			users.push({
				name: user.name,
				email: user.email,
				password: user.password,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		});

		await queryInterface.bulkInsert("Users", users);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users");
	},
};
