const Ticket = require('./../models/ticket')

const tikectInfo = async (req, res) => {
    const { departureCity, arrivalCity, returnDate, departureDate, isRounded, passangers, extraluggage } = req.body

    try {
        const ticketInfo = await Ticket.getTickets(departureCity, arrivalCity, departureDate, passangers, extraluggage)
        //console.log(ticketInfo)
        if (isRounded) {
            const ticketInfoReturn = await Ticket.getTickets(arrivalCity, departureCity, returnDate, passangers, extraluggage)
            //console.log(ticketInfoReturn)
            res.status(200).json({
                ticketInfo,
                ticketInfoReturn,
                message: 'success'
            })
        } else {
            res.status(200).json({
                ticketInfo,
                message: 'success'
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error al obtener datos de los viajes disponibles'
        })
    }
}

module.exports = {
    tikectInfo
}