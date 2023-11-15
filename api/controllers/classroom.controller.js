const Classroom = require('../models/classroom.model') 


async function getAllClassrooms(req, res){
    try {
        const classrooms = await Classroom.findAll()
        res.status(200).json(classrooms)
    } catch (error) {
        res.status(402).send(error.message)
    }
}

async function getOneClassroom(req, res) {
    console.log({body: req.body, params: req.params, query: req.query}) 
    try {
        const classroom = await Classroom.findByPk(req.params.id)
        if (!classroom){ res.status(500).send("classroom no encontrada")}
        res.status(200).json(classroom)
    } catch (error) {
        res.status(402).send(error.message)
    }
}

async function createClassroom(req, res){
    console.log(req.body)
    try {
        const classroom = await Classroom.create(req.body)
        res.status(200).send("classroom creada")

    } catch (error) {
        res.status(402).send(error.message)
    }
}

async function updateClassroom(req, res){
    try {
        const [classroom] = await Classroom.update(req.body, {
            where: {id: req.params.id},
        })
        res.status(200).json(classroom)
    } catch (error) {
        res.status(402).send(error.message)
    }
}

async function deleteClassroom(req, res){
    try {
        const classroom = await Classroom.destroy({
            where: { id: req.params.id },
        })
        res.status(200).json({text: "classroom eliminado", classroom: classroom})
    } catch (error) {
        res.status(402).send(error.message)
    }
}

module.exports = { getAllClassrooms, getOneClassroom, createClassroom, updateClassroom, deleteClassroom,}