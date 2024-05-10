const { verify } = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const admin = require('../config/firebase')
const iUser = require('./../interfaces/iUser')
const firestore = admin.firestore()

class User extends iUser {
    constructor(email, password, Nombre, Apaterno, Amaterno, Direccion, Telefono) {
        super()
        this.email = email
        this.password = password
        this.nombre = Nombre
        this.Apaterno = Apaterno
        this.Amaterno = Amaterno
        this.Direccion = Direccion
        this.Telefono = Telefono
    }
    static async createUser(email, password, Nombre, Apaterno, Amaterno, Direccion, Telefono) {
        try {
            const hash = await bcrypt.hash(password, 10)
            const user = firestore.collection('users').doc(email)
            await user.set({
                email, password: hash, Nombre, Apaterno, Amaterno, Direccion, Telefono
            })
            return new User(email, password, Nombre, Apaterno, Amaterno, Direccion, Telefono)
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('error creating user')
        }
    }

    async verifyPassword(password) {
        return await bcrypt.compare(password, this.password)
    }

    static async findByEmail(email) {
        try {
            const user = firestore.collection('users').doc(email)
            const userDoc = await user.get()
            if (userDoc.exists) {
                const userData = userDoc.data()
                return new User(userData.email, userData.password, userData.Nombre, userData.Apaterno, userData.Amaterno, userData.Direccion, userData.Telefono)
            }
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('error finding user')
        }
    }

    static async getAllUsers() {
        try {
            const users = await firestore.collection('users').get()
            const foundUsers = []
            users.forEach(doc => {
                foundUsers.push({
                    email: doc.id,
                    ...doc.data()
                })
            });
            return foundUsers
        } catch (error) {
            throw error
        }
    }

    static async deleteUser(userEmail) {
        try {
            await firestore.collection('users').doc(userEmail).delete()
            const userUpdates = await firestore.collection('users').doc(userEmail).get()
            return {
                userUpdated: userUpdates.data()
            }
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('error deleting user')
        }
    }

    static async updateUser(userEmail, userData) {
        try {
            await firestore.collection('users').doc(userEmail).update(userData)
        } catch (error) {
            console.log('Error => ', error)
            throw new Error('error updating user')
        }
    }

}

module.exports = User
