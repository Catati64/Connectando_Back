class iUser {
    /* 
    Crear un nuevo usuario
        @param {string} email -> correo del usuario
        @param {string} password -> password del usuario
        @param {string} Nombre -> nombre del usuario
        @param {string} Apaterno -> apellido paterno del usuario
        @param {string} Amaterno -> apellido materno del usuario
        @param {string} Direccion -> dirección del usuario
        @param {string} Telefono -> teléfono del usuario
        @return {promise<User>}
        @throws {error} si hay un error en la creación 
    */

    static async createUser(email, password, Nombre, Apaterno, Amaterno, Direccion, Telefono) { }
    static async findByEmail(email) { }
    async verifyPassword(password) { }
}

module.exports = iUser
