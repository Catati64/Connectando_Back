const express = require('express');
const { registerUser, loginUser, getAllUsers, deleteUser, updateUser } = require('./../controllers/userController');
const { tikectInfo } = require('./../controllers/ticketController')
const { purchaseTicket } = require('./../controllers/buysController')
const { createTrip, getAllTrips } = require('./../controllers/tripController');
const router = express.Router();
const authenticateToken = require('./../auth/authMiddleware');

// unprotected
router.post('/register', registerUser);
router.post('/login', loginUser);

// protected
router.get('/get-all-users', getAllUsers);
router.delete('/delete-user/:id', deleteUser);
router.put('/update-user/:id', updateUser);
// Tickets
router.get('/get-tikectInfo', tikectInfo);

// Puerchases
router.get('/purchase-tikect', purchaseTicket);

// Trips
router.post('/create-trip', createTrip);
router.get('/get-all-trips', getAllTrips);

module.exports = router;
