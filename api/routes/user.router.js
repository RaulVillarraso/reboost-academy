const { getAllUsers, createUser, updateUser, deleteUser, getOneUser, getBookedClasses,} = require('../controllers/user.controller')

const router = require('express').Router() 

router.get('/',  getAllUsers) 
router.get('/:id',getOneUser)
router.get('/booking/:id',getBookedClasses)
router.post('/',  createUser) 
router.put('/:id',updateUser) 
router.delete('/:id',deleteUser)  

module.exports = router

