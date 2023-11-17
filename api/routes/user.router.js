const { getAllUsers, createUser, updateUser, deleteUser, getOneUser, getBookedClasses,} = require('../controllers/user.controller')
const { checkAuth, checkAdmin } = require("../middleware");

const router = require('express').Router() 

router.get("/", checkAuth, checkAdmin, getAllUsers); 
router.get("/:id", checkAuth, checkAdmin, getOneUser);
router.get("/booking/:id", checkAuth, getBookedClasses);
router.post("/", checkAuth, checkAdmin, createUser); 
router.put("/:id", checkAuth, checkAdmin, updateUser); 
router.delete("/:id", checkAuth, checkAdmin, deleteUser);  

module.exports = router

