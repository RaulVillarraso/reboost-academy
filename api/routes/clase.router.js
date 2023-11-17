const { countClases,getAllClases, createClases, updateClases, deleteClases, getOneClases, } = require('../controllers/clase.controller')
const { checkAuth, checkAdmin } = require("../middleware");

const router = require('express').Router() 

router.get("/", checkAuth, checkAdmin, getAllClases); 
router.get("/:id", checkAuth, checkAdmin, getOneClases);
router.get("/count/:id", checkAuth, checkAdmin, countClases); 

router.post("/", checkAuth, checkAdmin, createClases); 
router.put("/:id", checkAuth, checkAdmin, updateClases); 
router.delete("/:id", checkAuth, checkAdmin, deleteClases);  

module.exports = router

