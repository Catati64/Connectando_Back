// controller 'tripController.js'
const Trip = require('./../models/trip')

const createTrip = async (req, res) => {
    const { userId, departureCity, arrivalCity, departureDate, price, itinerary, departureLocation, arrivalLocation, seats} = req.body

    const newTrip = await Trip.createTrip(userId, departureCity, arrivalCity, departureDate, price, itinerary, departureLocation, arrivalLocation, seats)
    if (!newTrip) {
        return res.status(402).json({ message: 'algo pasho' })
    } else {
        res.status(201).json({
            message: 'Trip created successfully',
            trip: newTrip
        })
    }
}

const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.getAllTrips()
        res.status(200).json({
            trips,
            message: 'success'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error al obtener viajes'
        })
    }
}

module.exports = {
    createTrip,
    getAllTrips
}
