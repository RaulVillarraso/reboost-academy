const { getOneClassroom_Clase_Teacher, getAllClassrooms, getOneClassroom, createClassroom, updateClassroom, deleteClassroom, } = require('../controllers/classroom.controller')
const { checkAuth, checkAdmin } = require("../middleware");


const router = require('express').Router()


router.get("/", checkAuth, checkAdmin, getAllClassrooms);
router.get("/:id", checkAuth, checkAdmin, getOneClassroom);
router.get("/:id/clase", checkAuth, checkAdmin, getOneClassroom_Clase_Teacher);
router.post("/", checkAuth, checkAdmin, createClassroom);
router.put("/:id", checkAuth, checkAdmin, updateClassroom);
router.delete("/:id", checkAuth, checkAdmin, deleteClassroom);

module.exports = router

