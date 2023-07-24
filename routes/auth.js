const router = require('express').Router();

const authController = require('../controllers/authController');

router.post('/register', authController.newUser);

router.post('/login', authController.loginUser);

module.exports = router;