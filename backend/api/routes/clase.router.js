const { countClases,getAllClases, createClases, updateClases, deleteClases, getOneClases, } = require('../controllers/clase.controller')
const { checkAuth, checkAdmin } = require("../middleware");

const router = require('express').Router() 

router.get("/", getAllClases); 
router.get("/:id", getOneClases);
router.get("/count/:id", countClases); 

router.post("/", checkAuth, checkAdmin, createClases); 
router.put("/:id", checkAuth, checkAdmin, updateClases); 
router.delete("/:id", checkAuth, checkAdmin, deleteClases);  

module.exports = router

