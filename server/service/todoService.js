const {Todo} = require('../models')

const getAllService = async (userId) => {
	const todos = await Todo.findAll({
		where: {
			userId
		},
		attributes: ["id", "title", "description", "status"],
		order: [
			['id', 'ASC']
		]
	})
	if(!todos || todos <= 0) {
		return false
	}
	return todos
}

const findOneService = async (userId, todoId) => {
	const todos = await Todo.findOne({
		where: {
			userId,
			id: todoId
		},
		attributes: ["id", "title", "description", "status"]
	})
	if(!todos || todos <= 0) {
		return false
	}
	return todos
}

const addService = async (userId, todo) => {
	const data = await Todo.create({
		userId,
		title: todo.title,
		description: todo.description
	})
	return data
}

const updateService = async (todoId, todo) => {
	const data = await Todo.update({
		title: todo.title,
		description: todo.description
	}, {
		where: {
			id: todoId
		}
	})
	return data
}

const doneService = async (todoId) => {
	const data = await Todo.update({
		status: true
	}, {
		where: {
			id: todoId
		}
	})
	return data
}

const undoneService = async (todoId) => {
	const data = await Todo.update({
		status: false
	}, {
		where: {
			id: todoId
		}
	})
	return data
}

const destroyService = async (id) => {
	return await Todo.destroy({
		where: {id}
	})
}

module.exports = {
	getAllService,
	findOneService,
	addService,
	updateService,
	doneService,
	undoneService,
	destroyService
}