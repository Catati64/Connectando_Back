const express = require('express');
const { registerUser, loginUser, getAllUsers, deleteUser, updateUser } = require('./../controllers/userController');
const { tikectInfo } = require('./../controllers/ticketController')
const router = express.Router();
const authenticateToken = require('./../auth/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
//unprotected
router.get('/get-all-users', getAllUsers);
router.delete('/delete-user/:id', deleteUser);
router.put('/update-user/:id', updateUser);
//Tickets
router.get('/get-tikectInfo', tikectInfo);

module.exports = router;
