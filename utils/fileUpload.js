const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: './public/upload/',
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({
    storage,
    limits: {fieldSize: process.env.UPLOAD_FILE_SIZE},
    fileFilter: function(req,file,cb){
        fiterFile(file,cb)
    }
})

const fiterFile = function(file,cb){
    const fileType = /jpg|png|gif|jpeg/
    const extname = fileType.test(path.extname(file.originalname))
    const mimeType = fileType.test(file.originalname)

    if(extname && mimeType){
        cb(null, true)
    } else{
        cb("Error: File not Upload!!")
    }
}

module.exports = upload