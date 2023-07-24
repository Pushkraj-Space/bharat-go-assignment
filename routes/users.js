const router = require('express').Router();
const authToken = require('../authToken');
const userController = require('../controllers/userController');

// *GET /users*: Retrieve a list of all users.
router.get('/', authToken, userController.getAllUsers);

// *GET /users/:id*: Retrieve a specific user by their ID.
router.get('/:id', authToken, userController.getUserById);

// *POST /users*: Create a new user.
router.post('/', authToken, userController.newUser);

// *PUT /users/:id*: Update an existing user by their ID.
router.put('/:id', authToken, userController.updateUser);

// *DELETE /users/:id*: Delete a user by their ID.
router.delete('/:id', authToken, userController.deleteUser);

module.exports = router;





