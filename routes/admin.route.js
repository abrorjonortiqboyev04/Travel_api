const { Router } = require('express')
const { addNewAdmin, loginAdmin } = require('../controllers/auth.controller')
const { isAuth } = require('../middlewares/auth')

const router = Router()

router.post('/add',isAuth, addNewAdmin)
router.post('/login', isAuth, loginAdmin)


module.exports = router