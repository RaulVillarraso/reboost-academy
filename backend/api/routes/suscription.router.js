const { getAllSuscriptions, getOneSuscription, createSuscription, updateSuscription, deleteSuscription, } = require("../controllers/suscription.controller")
const { checkAuth, checkAdmin } = require("../middleware");


const router = require('express').Router() 

router.get("/:id", getOneSuscription);
router.get("/", getAllSuscriptions); 
router.post("/", checkAuth, checkAdmin, createSuscription); 
router.put("/:id", checkAuth, checkAdmin, updateSuscription); 
router.delete("/:id", checkAuth, checkAdmin, deleteSuscription); 

module.exports = router