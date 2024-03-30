const { Router } = require('express')
const { addNewPaket, allPaket, deletePaket, 
        onePaketById, allUsers } = require('../controllers/paket.controller')
const { isAuth } = require('../middlewares/auth')

const router = Router()

router.post('/add',isAuth, addNewPaket)
router.get('/all',isAuth, allPaket)
router.delete('/delete/:id', isAuth, deletePaket)
router.get('/one/:id', isAuth, onePaketById)
router.get('/users/all',isAuth, allUsers)


module.exports = router