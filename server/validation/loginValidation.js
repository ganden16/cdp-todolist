const {body} = require("express-validator")
const {User} = require("../models")

const passwordValidator = async (password) => {
	const user = await User.findOne({
		where: {password}
	})
	if(!user) return Promise.reject("User not found")
}

const loginValidation = [
	body("password").notEmpty().withMessage("Password cannot be empty")
		.isNumeric({no_symbols: true}).withMessage('password must be number only')
		.isLength({min: 4}).withMessage("Password must be 4 characters long")
		.isLength({max: 4}).withMessage("Password must be 4 characters long")
		.custom(passwordValidator)
]

module.exports = loginValidation
