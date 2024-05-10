const jwt = require('jsonwebtoken')
const User = require('./../models/user')

const loginUser = async (req, res) => {
    const { email, password } = req.body

    const userDoc = await User.findByEmail(email)
    if (!userDoc) {
        return res.status(404).json({ message: 'usuario no encontrado' })
    }

    const isInvalidPass = await userDoc.verifyPassword(password)
    if (!isInvalidPass) {
        return res.status(401).json({ message: 'Contraseña invalida' })
    }

    const token = jwt.sign({ email: userDoc.email }, process.env.SECRET, { expiresIn: '1h' })
    res.status(200).json({
        message: 'Success',
        token
    })
}

const registerUser = async (req, res) => {
    const { email, password, Nombre, Apaterno, Amaterno, Direccion, Telefono } = req.body

    const existsUser = await User.findByEmail(email)
    if (existsUser) {
        return res.status(402).json({ message: 'El usuario ya existe' })
    }

    const newUser = await User.createUser(email, password, Nombre, Apaterno, Amaterno, Direccion, Telefono)
    if (!newUser) {
        return res.status(402).json({ message: 'algo pasho' })
    } else {
        res.status(201).json({
            message: 'User register successfully',
            user: newUser
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers()
        res.status(200).json({
            users,
            message: 'success'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error al obtener usuarios'
        })
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id
    try {
        await User.deleteUser(userId)
        res.status(200).json({
            message: 'Usuario eliminado exitosamente'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'error al eliminar usuario'
        })
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id
    const userData = req.body
    try {
        await User.updateUser(userId, userData)
        res.status(200).json({
            message: 'Usuario actualizado exitosamente'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'error al actualizar usuario'
        })
    }
}

module.exports = {
    loginUser,
    registerUser,
    getAllUsers,
    deleteUser,
    updateUser
}
