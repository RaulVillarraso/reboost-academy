const Clase = require('../models/clase.model')



async function getAllClases(req, res) {
    try {
        const clase = await Clase.findAll()
        if (clase.length !== 0) {
            return res.status(200).json(clase)
        } else {
            return res.status(200).send('There are no clases')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOneClases(req, res) {
    try {
        const clase = await Clase.findByPk(req.params.id)
        if (clase) {
            return res.status(200).json(clase)
        } else {
            return res.status(200).send('No clase found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createClases(req, res) {
    try {
        const clase = await Clase.create(req.body)
        res.status(200).send('Clase created sucessfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateClases(req, res) {
    try {
        const clase = await Clase.findByPk(req.params.id)
        clase.update(req.body)
        res.status(200).send('Clase updated successfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteClases(req, res) {
    try {
        const clase = await Clase.findByPk(req.params.id)
        clase.destroy()
        res.status(200).send('Clase deleted sucessfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getAllClases,
    getOneClases,
    createClases,
    updateClases,
    deleteClases,
}