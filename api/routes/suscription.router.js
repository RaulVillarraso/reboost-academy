const { getAllSuscriptions, getOneSuscription, createSuscription, updateSuscription, deleteSuscription, } = require("../controllers/suscription.controller")



const router = require('express').Router() 


router.get('/', getAllSuscriptions) 
router.post('/', createSuscription) 
router.put('/:id', updateSuscription) 
router.delete('/:id', deleteSuscription) 

module.exports = router