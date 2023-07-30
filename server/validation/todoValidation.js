const {body} = require("express-validator")

const todoValidation = [
	body("title").notEmpty().withMessage("title cannot be empty"),
	body("description").notEmpty().withMessage("description cannot be empty")
]

module.exports = todoValidation
