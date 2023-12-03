const {
  getAllUsers,
  getAllUsersBookings,
  createUser,
  createUserBooking,
  updateUser,
  deleteUser,
  getOneUser,
  getBookedClasses,
  getUserProfile,
  getUserSuscription,
  deleteUserBooking
} = require("../controllers/user.controller");
const { checkAuth, checkAdmin } = require("../middleware");

const router = require('express').Router() 

router.get("/profile", checkAuth, getUserProfile);
router.get("/suscription", checkAuth, getUserSuscription)
router.get("/", checkAuth, getAllUsers); 
router.get("/userbooking/:id", checkAuth, getAllUsersBookings); 
router.get("/:id", checkAuth, getOneUser);
router.get("/booking/:id", checkAuth, getBookedClasses);
router.post("/", checkAuth, createUser); 
router.post("/userbooking", checkAuth, createUserBooking); 
router.delete("/userbooking/delete", checkAuth, deleteUserBooking);
router.put("/:id", checkAuth, updateUser); 
router.delete("/:id", checkAuth, checkAdmin, deleteUser);  

module.exports = router

