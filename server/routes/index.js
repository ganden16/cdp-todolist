const {Router} = require('express')
const router = Router()

const {
	handleValidation,
	loginValidation,
	registerValidation,
	todoValidation,
} = require('../validation')
const authMiddleware = require('../middleware/authMiddleware')
const authController = require('../controller/authController')
const todoController = require('../controller/todoController')

router.get('/', (req, res) => {
	res.status(200).json({
		status: true,
		message: 'server running ok'
	})
})

router.post('/register', registerValidation, handleValidation, authController.register)
router.post('/login', loginValidation, handleValidation, authController.login)
router.get('/me', authMiddleware, authController.me)

router.get('/todo', authMiddleware, todoController.getAll)
router.get('/todo/:id', authMiddleware, todoController.findOne)
router.post('/todo', authMiddleware, todoValidation, handleValidation, todoController.add)
router.put('/todo/:id', authMiddleware, todoValidation, handleValidation, todoController.update)
router.put('/todo/done/:id', authMiddleware, todoController.done)
router.put('/todo/undone/:id', authMiddleware, todoController.undone)
router.delete('/todo/:id', authMiddleware, todoController.delete)

router.use('/', (req, res) => {
	res.status(400).json({
		status: false,
		message: 'endpoint not found'
	})
})

module.exports = router