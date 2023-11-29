const router = require('express').Router()
const { checkAuth, checkAdmin } = require("../middleware");

const { getAllTeachers, getOneTeacher, createTeacher, updateTeacher, deleteTeacher, getTeacherDifunto } = require('../controllers/teacher.controller')

//checkAuth, checkAdmin, Quitado de ruta para trabajar
router.get("/",  getAllTeachers);
router.get("/:id",  getOneTeacher);
router.post("/", checkAuth, checkAdmin, createTeacher);
router.put("/:id", checkAuth, checkAdmin, updateTeacher);
router.delete("/:id", checkAuth, checkAdmin, deleteTeacher);


module.exports = router