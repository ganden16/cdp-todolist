"use strict";

/** @type {import('sequelize-cli').Migration} */

const fs = require("fs");
let json = fs.readFileSync("data/todo.json");
let data = JSON.parse(json);

module.exports = {
	async up(queryInterface, Sequelize) {
		var todos = [];
		data.forEach((todo) => {
			todos.push({
				userId: todo.userId,
				title: todo.title,
				description: todo.description,
				status: todo.status,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		});

		await queryInterface.bulkInsert("Todos", todos);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Todos");
	},
};
