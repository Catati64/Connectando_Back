const admin = require('../config/firebase')
const firestore = admin.firestore()
const iBuy = require('./../interfaces/iBuys')

class Buy extends iBuy {
    constructor(email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData) {
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.departureSeat = departureSeat;
        this.returnSeat = returnSeat;
        this.passengers = passengers;
        this.paymentData = paymentData;
    }

    static async buyTicketGuest(email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData) {
        try {

            // Verificar la disponibilidad de los asientos
            const seatsAvailable = await this.checkSeatAvailability(departureSeat, returnSeat);
            if (!seatsAvailable) {
                throw new Error('Los asientos seleccionados no están disponibles');
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
                passengers
            });

            return new Buy(email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData);
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('error processing ticket purchase')
        }
    }

    static async checkSeatAvailability(departureSeat, returnSeat) {
        try {
            // Obtén la información del viaje de ida
            const departureTrip = await firestore.collection('trips').doc(departureSeat.tripId).get();
            if (!departureTrip.exists) {
                throw new Error('El viaje de ida seleccionado no existe');
            }
    
            // Verifica si los asientos seleccionados para el viaje de ida están disponibles
            const departureSeats = departureTrip.data().seats;
            for (let seat of departureSeat.seats) {
                if (departureSeats[seat] !== 'available') {
                    throw new Error(`El asiento ${seat} para el viaje de ida ya está ocupado`);
                }
            }
    
            // Si se seleccionó un viaje de vuelta, verifica la disponibilidad de los asientos
            if (returnSeat) {
                // Obtén la información del viaje de vuelta
                const returnTrip = await firestore.collection('trips').doc(returnSeat.tripId).get();
                if (!returnTrip.exists) {
                    throw new Error('El viaje de vuelta seleccionado no existe');
                }
    
                // Verifica si los asientos seleccionados para el viaje de vuelta están disponibles
                const returnSeats = returnTrip.data().seats;
                for (let seat of returnSeat.seats) {
                    if (returnSeats[seat] !== 'available') {
                        throw new Error(`El asiento ${seat} para el viaje de vuelta ya está ocupado`);
                    }
                }
            }
    
            // Salida correcta
            return true;
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('Error al verificar la disponibilidad de los asientos')
        }
    }

    static async processPayment(paymentData) {

    }
}

module.exports = Buy
