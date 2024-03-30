const { Router } = require('express')
const { addOrder, shopping, allOrder, notShopping } = require('../controllers/buyurtma.controller')
const { isAuth } = require('../middlewares/auth')

const router = Router()

router.post('/add/:id',isAuth, addOrder)
router.get('/shopping/:id', isAuth, shopping)
router.get('/all', isAuth, allOrder)
router.get('/notshopping/:id', isAuth, notShopping)

module.exports = router