const router = require('express').Router()

router.use("/booking", require("./booking.router"))
router.use("/clase", require("./clase.router"))
router.use('/classroom', require('./classroom.router'))
router.use('/suscription', require('./suscription.router'))
router.use('/teacher', require('./teacher.router'))
router.use('/user', require('./user.router'))


module.exports = router
