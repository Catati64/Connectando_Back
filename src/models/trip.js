// model 'trip.js'
const admin = require('../config/firebase')
const firestore = admin.firestore()

class Trip {
    constructor(userId, departureCity, arrivalCity, departureDate, price, itinerary, departureLocation, arrivalLocation, seats) {
        this.userId = userId
        this.departureCity = departureCity
        this.arrivalCity = arrivalCity
        this.departureDate = departureDate
        this.price = price
        this.itinerary = itinerary
        this.departureLocation = departureLocation
        this.arrivalLocation = arrivalLocation
        this.seats = seats
    }

    static async createTrip(userId, departureCity, arrivalCity, departureDate, price, itinerary, departureLocation, arrivalLocation, seats) {
        try {
            const trip = firestore.collection('trips').doc()
            await trip.set({
                userId, departureCity, arrivalCity, departureDate, price, itinerary, departureLocation, arrivalLocation, seats
            })
            return new Trip(userId, departureCity, arrivalCity, departureDate, price, itinerary, departureLocation, arrivalLocation, seats)
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('error creating trip')
        }
    }

    static async getAllTrips() {
        try {
            const trips = await firestore.collection('trips').get()
            const foundTrips = []
            trips.forEach(doc => {
                foundTrips.push({
                    tripId: doc.id,
                    ...doc.data()
                })
            });
            return foundTrips
        } catch (error) {
            throw error
        }
    }
}

module.exports = Trip
