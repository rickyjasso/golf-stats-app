const {Router} = require('express');
const { getUsers, register, login, protected, logout } = require('../controllers/auth');
const { registerValidation, loginValidation } = require('../validators/auth');
const { userAuth } = require('../middlewares/auth_middleware');
const { validationMiddleware } = require('../middlewares/validations_middleware');
const router = Router();

router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', userAuth, logout);

module.exports = router