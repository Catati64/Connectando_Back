const admin = require('../config/firebase')
const firestore = admin.firestore()

class Buy {
    constructor(email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData, tripId, tripIdReturn, price) {
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.departureSeat = departureSeat;
        this.returnSeat = returnSeat;
        this.passengers = passengers;
        this.paymentData = paymentData;
        this.tripId = tripId;
        this.tripIdReturn = tripIdReturn;
        this.price = price;
    }

    static async buyTicketGuest(email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData, tripId, tripIdReturn, price) {
        try {
            // Verificar la disponibilidad de los asientos
            console.log(departureSeat)
            const seatsAvailable = await this.checkSeatAvailability(tripId, departureSeat, passengers);
            if (!seatsAvailable) {
                throw new Error('Los asientos seleccionados ya no están disponibles');
            }

            if (tripIdReturn) {
                // Verificar la disponibilidad de los asientos
                const seatsAvailable = await this.checkSeatAvailability(tripIdReturn, returnSeat, passengers);
                if (!seatsAvailable) {
                    throw new Error('Los asientos seleccionados en el retorno ya no están disponibles');
                }
            }

            // Procesar el pago
            const paymentSuccessful = await this.processPayment(paymentData);
            if (!paymentSuccessful) {
                throw new Error('Hubo un problema al procesar el pago');
            }


            // Crear el boleto en la base de datos
            const ticket = firestore.collection('tickets').doc();
            await ticket.set({
                email,
                name,
                lastName,
                phone,
                departureSeat,
                returnSeat,
                passengers,
                tripId,
                tripIdReturn,
                price
            });

            return { buy: new Buy(email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData, tripId, tripIdReturn, price), ticketId: ticket.id }
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('error processing ticket purchase')
        }
    }

    static async checkSeatAvailability(tripId, departureSeat, passengers) {
        try {
            // Obtén la información del viaje de ida
            const departureTripRef = firestore.collection('trips').doc(tripId);
            const departureTrip = await departureTripRef.get();
            if (!departureTrip.exists) {
                throw new Error('El viaje de ida seleccionado no existe');
            }

            // Verifica si los asientos seleccionados para el viaje de ida están disponibles
            const departureSeats = departureTrip.data().seats;
            for (let seat of departureSeat) {
                if (departureSeats[seat] !== 'available') {
                    throw new Error(`El asiento ${seat} para el viaje de ida ya está ocupado`);
                }
            }

            // Cambia el estado de los asientos a "occupied"
            for (let seat of departureSeat) {
                departureSeats[seat] = 'occupied';
            }
            // Reduce el número de availableSeats en el número de pasajeros
            const availableSeats = departureTrip.data().availableSeats - passengers;


            // Actualiza la información del viaje en la base de datos
            await departureTripRef.update({
                seats: departureSeats,
                availableSeats: availableSeats
            });

            // Salida correcta
            return true;
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('Error al verificar la disponibilidad de los asientos')
        }
    }

    static async processPayment(paymentData) {
        if (paymentData) {
            return 1;
        }
    }

    static async getTicket(ticketId) {
        try {
            const ticketRef = firestore.collection('tickets').doc(ticketId);
            const ticket = await ticketRef.get();
    
            if (!ticket.exists) {
                throw new Error('El boleto no existe');
            } else {
                const { email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData, tripId, tripIdReturn, price } = ticket.data();
                return { ticket: new Buy(email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData, tripId, tripIdReturn, price), ticketId: ticket.id };
            }
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('Error al recuperar el boleto')
        }
    }
    
    

}

module.exports = Buy
