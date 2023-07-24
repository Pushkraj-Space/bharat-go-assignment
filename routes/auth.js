const router = require('express').Router();
const authController = require('../controllers/authController');

// *POST /auth/register*: Register a new user.
router.post('/register', authController.newUser);

// *POST /auth/login*: Authenticate and generate a JWT token for the user.
router.post('/login', authController.loginUser);

module.exports = router;