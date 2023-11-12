const Teacher = require('../models/teacher.model') 


async function getAllTeachers(req, res) {
    try {
        const teachers = await Teacher.findAll()
        if (teachers.length !== 0) {
            res.status(200).json(teachers)
        }
        else { res.status(200).send("Not teachers found") }
    } catch (error) {
        res.status(402).send(error.message)
    }
}

async function getOneTeacher(req, res) {
    console.log({ body: req.body, params: req.params, query: req.query })  //consultar lo que nos llega en la request
    try {
        const teacher = await Teacher.findByPk(req.params.id)
        if (!teacher) { res.status(500).send("Teacher not found") }
        res.status(200).json(teacher)
    } catch (error) {
        res.status(402).send(error.message)
    }
}

async function createTeacher(req, res) {
    console.log(req.body)
    try {
        const teacher = await Teacher.create(req.body)
        res.status(200).send("Teacher created")
    } catch (error) {
        res.status(402).send(error.message)
    }
}

async function updateTeacher(req, res) {
    try {
        const [teacher] = await Teacher.update(req.body, {
            where: { id: req.params.id },
        })
        res.status(200).json(teacher)
    } catch (error) {
        res.status(402).send(error.message)
    }
}

async function deleteTeacher(req, res) {
    try {
        const teacher = await Teacher.destroy({
            where: { id: req.params.id },
        })
        res.status(200).json({ text: "Teacher deleted", teacher: teacher })
    } catch (error) {
        res.status(402).send(error.message)
    }
}


module.exports = { getAllTeachers, getOneTeacher, createTeacher, updateTeacher, deleteTeacher, }