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

    static async createTrip(userId, departureCity, arrivalCity, departureDateUnFormat, price, itinerary, departureLocation, arrivalLocation, seats, extraluggage) {
        try {

            // Convertir la fecha de salida en un objeto Date de JavaScript
            const departureDateParts = departureDateUnFormat.split("-");
            const departureDateObject = new Date(departureDateParts[0], departureDateParts[1] - 1, departureDateParts[2]);

            // Convertir el objeto Date en un objeto Timestamp de Firestore
            const departureDate = admin.firestore.Timestamp.fromDate(departureDateObject);
            //console.log(departureCity, arrivalCity, departureDate, passangers, extraluggage);

            const availableSeats = seats.length
            const trip = firestore.collection('trips').doc()
            await trip.set({
                userId, departureCity, arrivalCity, departureDate, price, itinerary, departureLocation, arrivalLocation, seats, availableSeats, extraluggage
            })
            return new Trip(userId, departureCity, arrivalCity, departureDate, price, itinerary, departureLocation, arrivalLocation, seats, extraluggage, availableSeats)
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
