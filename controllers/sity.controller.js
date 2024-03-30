const Stiy = require('../models/sity.model')
const Comment = require('../models/comment.model')
const errorMessage = require('../utils/errorMessage')


// Description         All Sitys
// Route               GET     /api/trevel/sity/all
exports.allSity = async (req,res)=>{
 try {
    const sitys = await Stiy.find()
    res.status(200).json({
        sitys
    })
 } 
 catch (error) {  return errorMessage(res,500,error.message)  }
}


// Description          Add Sitys
// Route                POST    /api/trevel/sity/add
exports.addNewSity = async (req,res)=>{
 try {
    const { name, joylashuv } = req.body

    if(!name || !joylashuv){
        return errorMessage(res,400,"Malumotlar to'liq kiritilmadi!!")
    }

    const images = []

    for(let i=0; i<req.files.length; i++){
        images.push('/upload/' + req.files[i].filename)
    }

    const newSity = await Stiy.create({
        name, 
        joylashuv,
        rasm: images
    })

    return res.status(201).json({
        newSity
    })
 } 
 catch (error) {  return errorMessage(res,500,error.message)  }
}


// Description            Update Sity By Id
// Route                  PUT   /api/trevel/sity/update/:id
exports.updateSity = async (req,res)=>{
 try {
    const sity = await Stiy.findOne({_id: req.params.id})
    
    const updateNewSity = {
        name: req.body.name  || sity.name,
        joylashuv: req.body.joylashuv || sity.name
    }
    
    const newSity = await Stiy.findOneAndUpdate({_id: req.params.id},updateNewSity,{new: true})

    res.status(200).json({
        newSity
    })

 } 
 catch (error) { errorMessage(res,500,error.message) }
}

// Description         Add Image Upload User
// Route               PUT  /api/trevel/sity/upload/:id
exports.imageUploadUser = async (req,res)=>{
 try {
    const sity = await Stiy.findOne({_id: req.params.id})

    const images = []

    for(let i=0; i<req.files.length; i++){
        images.push('/upload/' + req.files[i].filename)
    }

    const newSity = await Stiy.findOneAndUpdate(
        {_id: req.params.id}, 
        {foydalanuvchilar_rasmi: images}, 
        {new: true}
    )

    res.status(200).json({
        sity: newSity
    })

 } 
 catch (error) { errorMessage(res,500,error.message)  }
}

// Description         Delete Sity
// Route               DELETE   /api/trevel/sity/delete/:id
exports.sityDeleteById = async (req,res)=>{
try {

    await Stiy.findOneAndDelete({_id: req.params.id})
   
    res.status(200).json({
           message: "Sity Deleted"
    })
   
 } 
 catch (error) { errorMessage(res,500,error.message)  }
}

// Description         Open One Sity By Id
// Route               DELETE   /api/trevel/sity/single/:id
exports.sityOpenOneById = async (req,res)=>{
try {
    const sity = await Stiy.findOne({_id: req.params.id})
    const comment = await Comment.find({sity: req.params.id})
   
    res.status(200).json({
       sity,
       comment
    })
   
 } 
 catch (error) { errorMessage(res,500,error.message)  }
}

// Description        Add Comment
// Route              POST    /api/trevel/sity/comment/add/:id
exports.addComment = async (req,res)=>{
    try {
        const { text, name } = req.body
        
        const comment = {
         text,
         name,
         sity: req.params.id
        }
 
        const newComment = await Comment.create(comment)
 
        res.status(201).json({
           newComment
        })
     } 
     catch (error) {  errorMessage(res,500,error.message) }
    }