const express = require('express');
const { registerUser, loginUser, getAllUsers, deleteUser, updateUser } = require('./../controllers/userController');
const router = express.Router();
const authenticateToken = require('./../auth/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-all-users', authenticateToken, getAllUsers);
router.delete('/delete-user/:id', authenticateToken, deleteUser);
router.put('/update-user/:id', authenticateToken, updateUser);

module.exports = router;
