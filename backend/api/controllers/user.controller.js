const Booking = require('../models/booking.model')
const Classroom = require('../models/classroom.model')
const Clase = require('../models/clase.model')
const User = require('../models/user.model')
const Suscription = require('../models/suscription.model')
const User_booking = require('../models/user_booking.model')



async function getAllUsers(req, res) {
    try {
        const user = await User.findAll()
        if (user.length !== 0) {
            return res.status(200).json(user)
        } else {
            return res.status(200).send('There are no users')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
async function getAllUsersBookings(req, res) {
    try {
      const userId = req.params.id; 
  
      const usersBookings = await User_booking.findAll({
        where: { userId: userId },
      });
  
      if (usersBookings.length !== 0) {
        return res.status(200).json(usersBookings);
      } else {
        return res.status(200).send('There are no user bookings for the specified user');
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
  
  

async function getOneUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(200).send('No user found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createUser(req, res) {
    try {
        const user = await User.create(req.body)
        res.status(200).send('User created sucessfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createUserBooking(req, res) {
    try {
        const user_booking = await User_booking.create(req.body)
        res.status(200).send("Booked successfully");
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function updateUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        user.update(req.body)
        res.status(200).send('User updated successfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id)
        user.destroy()
        res.status(200).send('User deleted sucessfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function deleteUserBooking(req, res) {
    const { userId, bookingId } = req.body;

    try {
        
        const user_booking = await User_booking.findOne({
            where: {
                userId: userId,
                bookingId: bookingId,
            },
        });

        if (user_booking) {
            await user_booking.destroy();
            res.status(200).send('User booking deleted');
        } else {
            res.status(404).send('User booking not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}



async function getBookedClasses(req, res) {
    try {
        const user = await User.findOne({
            where: {id: req.params.id},
            include: [
                {
                    model: Booking,
                    attributes: ['start'],
                    include: [
                        {
                            model: Clase,
                            attributes: ['classname'],
                            include: [
                                {
                                    model:Classroom,
                                    attributes: ['classroomname']
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(200).send('No bookings found for this user')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getUserProfile(req, res) {
    try {
        const user = await User.findByPk(res.locals.user.id);
        if (user) {
        return res.status(200).json(user);
        } else {
        return res.status(200).send("No user found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getUserSuscription(req, res){
    try {
        const user = await User.findByPk(res.locals.user.id)
        res.status(200).send( await user.getSuscription() )
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
  getAllUsers,
  getAllUsersBookings,
  getOneUser,
  createUser,
  createUserBooking,
  updateUser,
  deleteUser,
  getBookedClasses,
  getUserProfile,
  getUserSuscription,
  deleteUserBooking
};