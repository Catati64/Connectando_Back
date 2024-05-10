const admin = require('../config/firebase')
const firestore = admin.firestore()
const iTicket = require('./../interfaces/iTicket')

class Ticket extends iTicket {
    constructor(id, departureCity, arrivalCity, departureDate, returnDate, price, itinerary, departureLocation, arrivalLocation) {
        this.id = id;
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.price = price;
        this.itinerary = itinerary;
        this.departureLocation = departureLocation;
        this.arrivalLocation = arrivalLocation;
    }

    static async getTicketInfo() {
        try {
            const tickets = await firestore.collection('tickets').get()
            const foundTickets = []
            tickets.forEach(doc => {
                const ticketData = doc.data()
                foundTickets.push(new Ticket(doc.id, ticketData.departureCity, ticketData.arrivalCity, ticketData.departureDate, ticketData.returnDate, ticketData.price, ticketData.itinerary, ticketData.departureLocation, ticketData.arrivalLocation))
            });
            return foundTickets
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('error getting ticket info')
        }
    }
}

module.exports = Ticket
