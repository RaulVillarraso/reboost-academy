const { getAllClases, createClases, updateClases, deleteClases, getOneClases, } = require('../controllers/clase.controller')

const router = require('express').Router() 

router.get('/',  getAllClases) 
router.get('/:id',getOneClases)
router.post('/',  createClases) 
router.put('/:id',updateClases) 
router.delete('/:id',deleteClases)  

module.exports = router

