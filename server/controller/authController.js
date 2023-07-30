const {User} = require('../models')
const jwt = require('jsonwebtoken')

module.exports = class authController {
	static async register(req, res) {
		try {
			await User.create({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			})
			return res.status(201).json({
				status: true,
				message: 'user register successfuly',
				data: {
					name: req.body.name,
					email: req.body.email,
				}
			})
		} catch(error) {
			return res.status(500).json({
				status: false,
				message: 'internal server error'
			})
		}
	}

	static async login(req, res) {
		try {
			const user = await User.findOne({
				where: {
					password: req.body.password
				}
			})
			const token = jwt.sign({
				userId: user.id,
				name: user.name,
				email: user.email,
			}, process.env.JWT_SECRET_KEY, {
				expiresIn: "1d"
			})
			return res.status(200).json({
				status: true,
				message: 'success login',
				token
			})
		} catch(error) {
			return res.status(500).json({
				status: false,
				message: 'internal server error'
			})
		}
	}

	static async me(req, res) {
		const user = await User.findByPk(req.user.id, {
			attributes: ['id', 'name', 'email']
		})
		return res.status(200).json({
			status: true,
			message: 'who am i',
			data: user
		})
	}
}