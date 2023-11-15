const router = require('express').Router()

const { getAllTeachers, getOneTeacher, createTeacher, updateTeacher, deleteTeacher, getTeacherDifunto } = require('../controllers/teacher.controller')

router.get('/', getAllTeachers)
router.get('/:id', getOneTeacher)
router.post('/', createTeacher)
router.put('/:id', updateTeacher)
router.delete('/:id', deleteTeacher)


module.exports = router