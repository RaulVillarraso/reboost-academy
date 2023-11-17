const Clase = require('../models/clase.model')
const Classroom = require('../models/classroom.model') 
const Teacher = require('../models/teacher.model')


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

async function getOneClassroom_Clase_Teacher(req, res) {
    console.log({ body: req.body, params: req.params, query: req.query });
    try {
      const classroom = await Classroom.findAll({
        where: { id: req.params.id },
        include: [
          {
            model: Clase,
            attributes: ['classname'],
            include: [
              {
                model: Teacher,
                attributes: ['firstName', 'lastName'],
                
              },
            ],
          },
        ],
      });
  
      if (!classroom) {
        return res.status(404).send("Clase no encontrado"); // Cambiado a código de estado 404 para un recurso no encontrado.
      }
  
      res.status(200).json(classroom);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  



module.exports = { getOneClassroom_Clase_Teacher,getAllClassrooms, getOneClassroom, createClassroom, updateClassroom, deleteClassroom,}