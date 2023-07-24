const router = require('express').Router();
const authToken = require('../authToken');
const userController = require('../controllers/userController');

// 3. *GET /users*: Retrieve a list of all users.
router.get('/', authToken, userController.getAllUsers);

// 4. *GET /users/:id*: Retrieve a specific user by their ID.
router.get('/:id', authToken, userController.getUserById);

// 5. *POST /users*: Create a new user.
router.post('/', authToken, userController.newUser);

// 6. *PUT /users/:id*: Update an existing user by their ID.
router.put('/:id', authToken, userController.updateUser);

// 7. *DELETE /users/:id*: Delete a user by their ID.
router.delete('/:id', authToken, userController.deleteUser);
module.exports = router;





