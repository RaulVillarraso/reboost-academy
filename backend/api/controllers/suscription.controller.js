const Suscription = require('../models/suscription.model')



async function getAllSuscriptions(req, res){
    try {
        const suscription = await Suscription.findAll()
        if(suscription.length !== 0){
            return res.status(200).json(suscription)
        } else {
            return res.status(200).send('There are no suscriptions')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getOneSuscription(req, res){
    try {
        const suscription = await Suscription.findByPk(req.params.id)
        if(suscription){
            return res.status(200).json(suscription)
        } else {
            return res.status(200).send('No suscription found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createSuscription(req, res){
    try {
        const suscription = await Suscription.create(req.body)
        res.status(200).send('Suscription created sucessfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateSuscription(req, res){
    try {
        const suscription = await Suscription.findByPk(req.params.id)
        suscription.update(req.body)
        res.status(200).send('Suscription updated successfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteSuscription(req, res){
    try {
        const suscription = await Suscription.findByPk(req.params.id)
        suscription.destroy()
        res.status(200).send('Suscription deleted sucessfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getAllSuscriptions,
    getOneSuscription,
    createSuscription,
    updateSuscription,
    deleteSuscription,
}