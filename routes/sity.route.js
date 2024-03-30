const { Router } = require('express')
const { addNewSity, allSity, updateSity,
        imageUploadUser, sityDeleteById, 
        sityOpenOneById, addComment
      } = require('../controllers/sity.controller')
const upload = require('../utils/fileUpload')
const { isAuth } = require('../middlewares/auth')

const router = Router()

router.get('/all', isAuth, allSity)
router.get('/single/:id', isAuth, sityOpenOneById )

router.put('/update/:id', isAuth, updateSity) 
router.put('/upload/:id', isAuth, upload.array('image', 3), imageUploadUser)

router.post('/add', isAuth, upload.array('rasm', 5), addNewSity)
router.post('/comment/add/:id', isAuth, addComment)

router.delete('/delete/:id', isAuth, sityDeleteById)


module.exports = router