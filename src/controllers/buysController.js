const Buy = require('./../models/buys')

const purchaseTicket = async (req, res) => {
    const { email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData, tripId, tripIdReturn, price} = req.body

    try {
        const purchase = await Buy.buyTicketGuest(email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData, tripId, tripIdReturn, price)
        res.status(200).json({
            purchase,
            message: 'Compra exitosa'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error al realizar la compra'
        })
    }
}

const getTicketById = async (req, res) => {
    const { ticketId } = req.body;

    try {
        const ticket = await Buy.getTicket(ticketId);
        res.status(200).json({
            ticket,
            message: 'Boleto recuperado con éxito'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al recuperar el boleto'
        });
    }
}

module.exports = {
    purchaseTicket,
    getTicketById
}
