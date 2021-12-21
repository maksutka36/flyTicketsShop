const Router = require('express')
const router = new Router()
const controller = require('./authController')
const authCheck = require("./middleware/check-auth")

router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.post('/history', controller.uploadHistoryUsers)
router.post('/gethistory', controller.getHistory)

module.exports = router