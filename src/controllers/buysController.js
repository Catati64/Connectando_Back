const Buy = require('./../models/ticket')

const purchaseTicket = async (req, res) => {
    const { email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData } = req.body

    try {
        const purchase = await Buy.buyTicketGuest(email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData)
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

module.exports = {
    purchaseTicket
}
