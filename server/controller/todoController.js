const {
	getAllService,
	findOneService,
	addService,
	updateService,
	doneService,
	undoneService,
	destroyService
} = require('../service/todoService')

module.exports = class todoController {
	static async getAll(req, res) {
		try {
			const data = await getAllService(req.user.id)
			if(!data) {
				return res.status(400).json({
					status: false,
					message: 'your todo list is empty',
				})
			}
			return res.status(200).json({
				status: true,
				message: 'todo list',
				data
			})
		} catch(error) {
			return res.status(500).json({
				status: false,
				message: 'internal server error'
			})
		}
	}
	static async findOne(req, res) {
		try {
			const data = await findOneService(req.user.id, req.params.id)
			if(!data) {
				return res.status(400).json({
					status: false,
					message: 'todo list not found',
				})
			}
			return res.status(200).json({
				status: true,
				message: 'detail todo list',
				data
			})
		} catch(error) {
			return res.status(500).json({
				status: false,
				message: 'internal server error'
			})
		}
	}
	static async add(req, res) {
		try {
			const data = await addService(req.user.id, req.body)
			return res.status(200).json({
				status: true,
				message: 'todo list added successfuly',
				data
			})
		} catch(error) {
			return res.status(500).json({
				status: false,
				message: 'internal server error'
			})
		}
	}
	static async update(req, res) {
		try {
			await updateService(req.params.id, req.body)
			return res.status(200).json({
				status: true,
				message: 'todo list updated successfuly',
				data: {
					title: req.body.title,
					description: req.body.description
				}
			})
		} catch(error) {
			return res.status(500).json({
				status: false,
				message: 'internal server error'
			})
		}
	}
	static async done(req, res) {
		try {
			await doneService(req.params.id)
			return res.status(200).json({
				message: 'todo list done',
			})
		} catch(error) {
			return res.status(500).json({
				message: 'internal server error'
			})
		}
	}

	static async undone(req, res) {
		try {
			await undoneService(req.params.id)
			return res.status(200).json({
				message: 'todo list undone',
			})
		} catch(error) {
			return res.status(500).json({
				status: false,
				message: 'internal server error'
			})
		}
	}

	static async delete(req, res) {
		try {
			await destroyService(req.params.id)
			return res.status(200).json({
				status: true,
				message: 'todo list deleted successfuly',
				data: {
					id: req.params.id
				}
			})
		} catch(error) {
			return res.status(500).json({
				status: false,
				message: 'internal server error'
			})
		}
	}
}