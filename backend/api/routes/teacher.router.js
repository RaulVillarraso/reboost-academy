const router = require('express').Router()
const { checkAuth, checkAdmin } = require("../middleware");

const { getAllTeachers, getOneTeacher, createTeacher, updateTeacher, deleteTeacher, getTeacherDifunto } = require('../controllers/teacher.controller')

//checkAuth, checkAdmin, Quitado de ruta para trabajar
router.get("/", checkAuth,  getAllTeachers);
router.get("/:id", checkAuth,  getOneTeacher);
router.post("/", checkAuth, checkAdmin, createTeacher);
router.put("/:id", checkAuth, checkAdmin, updateTeacher);
router.delete("/:id", checkAuth, checkAdmin, deleteTeacher);


module.exports = router