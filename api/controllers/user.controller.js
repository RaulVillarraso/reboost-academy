const User = require('../models/user.model')

//CRUD

async function getAllUsers(req, res) {
    try {
        const user = await User.findAll()
        if (user.length !== 0) {
            return res.status(200).json(user)
        } else {
            return res.status(200).send('There are no users')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOneUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(200).send('No user found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getUserDifunto(req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        
            const deceased = await user.getDeceaseds()
        
        if (user) {
            return res.status(200).json(deceased)
        } else {
            return res.status(200).send('No deceased found in this user')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createUser(req, res) {
    try {
        const user = await User.create(req.body)
        res.status(200).send('User created sucessfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        user.update(req.body)
        res.status(200).send('User updated successfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        user.destroy()
        res.status(200).send('User deleted sucessfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    getUserDifunto
}