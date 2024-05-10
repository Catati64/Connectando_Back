class iBuy {
    /* 
    Procesar la compra de un boleto
        @param {string} email -> correo del usuario
        @param {string} name -> nombre del usuario
        @param {string} lastName -> apellido del usuario
        @param {string} phone -> teléfono del usuario
        @param {Array} departureSeat -> asientos de ida
        @param {Array} returnSeat -> asientos de vuelta
        @param {Array} passengers -> pasajeros
        @param {Object} paymentData -> datos de pago
        @return {promise<Buy>}
        @throws {error} si hay un error en la compra 
    */
    static async buyTicketGuest(email, name, lastName, phone, departureSeat, returnSeat, passengers, paymentData) { }
}

module.exports = iBuy
