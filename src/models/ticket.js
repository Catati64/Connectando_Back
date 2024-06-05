const admin = require('../config/firebase')
const firestore = admin.firestore()

class Ticket{
    constructor(id, departureCity, arrivalCity, departureDate, returnDate, price, itinerary, departureLocation, arrivalLocation, seats, availableSeats, extraluggage) {
        this.id = id;
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.price = price;
        this.itinerary = itinerary;
        this.departureLocation = departureLocation;
        this.arrivalLocation = arrivalLocation;
        this.seats = seats;
        this.avaavailableSeats = availableSeats
        this.extraluggage = extraluggage;
    }

    static async getTickets(departureCity, arrivalCity, departureDate, passangers, extraluggage) {
        try {
            // Convertir la fecha de salida en un objeto Date de JavaScript
            const departureDateParts = departureDate.split("-");
            const departureDateObject = new Date(departureDateParts[0], departureDateParts[1] - 1, departureDateParts[2]);

            // Convertir el objeto Date en un objeto Timestamp de Firestore
            const departureTimestamp = admin.firestore.Timestamp.fromDate(departureDateObject);
            //console.log(departureCity, arrivalCity, departureDate, passangers, extraluggage);

            let query = firestore.collection('trips').where('departureCity', '==', departureCity).where('arrivalCity', '==', arrivalCity).where('departureDate', '>=', departureTimestamp).where('availableSeats', '>=', passangers).where('extraluggage', '>=', extraluggage)

            const ticketsSnapshot = await query.get()
            const foundTickets = []
            ticketsSnapshot.forEach(doc => {
                const ticketData = doc.data()
                //console.log(ticketData)
                foundTickets.push(new Ticket(doc.id, ticketData.departureCity, ticketData.arrivalCity, ticketData.departureDate, ticketData.returnDate, ticketData.price, ticketData.itinerary, ticketData.departureLocation, ticketData.arrivalLocation, ticketData.seats, ticketData.availableSeats, ticketData.extraluggage))
            });
            return foundTickets
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('error getting tickets')
        }
    }
}

module.exports = Ticket
