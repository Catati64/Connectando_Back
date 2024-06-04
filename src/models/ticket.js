// model 'ticket.js'
const admin = require('../config/firebase')
const firestore = admin.firestore()
const iTicket = require('../interfaces/iTicket')

class Ticket extends iTicket {
    constructor(id, departureCity, arrivalCity, departureDate, returnDate, price, itinerary, departureLocation, arrivalLocation, passangers, extraluggage) {
        this.id = id;
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.price = price;
        this.itinerary = itinerary;
        this.departureLocation = departureLocation;
        this.arrivalLocation = arrivalLocation;
        this.passangers = passangers;
        this.extraluggage = extraluggage;
    }

    static async getTickets(departureCity, arrivalCity, departureDate, returnDate, isRounded) {
        try {
            let query
            if (isRounded) {
                query = firestore.collection('trips').where('departureCity', '==', departureCity).where('arrivalCity', '==', arrivalCity).where('departureDate', '>=', returnDate)
            } else {
                query = firestore.collection('trips').where('departureCity', '==', departureCity).where('arrivalCity', '==', arrivalCity).where('departureDate', '>=', departureDate)
            }
            const ticketsSnapshot = await query.get()
            const foundTickets = []
            ticketsSnapshot.forEach(doc => {
                const ticketData = doc.data()
                foundTickets.push(new Ticket(doc.id, ticketData.departureCity, ticketData.arrivalCity, ticketData.departureDate, ticketData.returnDate, ticketData.price, ticketData.itinerary, ticketData.departureLocation, ticketData.arrivalLocation))
            });
            return foundTickets
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('error getting tickets')
        }
    }
}

module.exports = {Ticket}