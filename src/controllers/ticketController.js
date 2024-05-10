const ticket = require('./../models/user')

const tikectInfo = async (req, res) => {
    const {} = req.body

    try {
        const ticketInfo = await ticket.getTicketInfo()
        res.status(200).json({
            ticketInfo,
            message: 'success'
        })
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