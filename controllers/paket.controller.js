const Paket = require('../models/paket.model')
const Mijoz = require('../models/mijoz.model')
const Sity = require('../models/sity.model')
const errorMessage = require('../utils/errorMessage')


// Description        Add New Paket
// Route              POST    /api/trevel/paket/add
exports.addNewPaket = async (req,res)=>{
 try {
    const { narxi, sayohat_muddati, shahar_nomi, chiptalar_soni, sayohat_vaqti } = req.body
    
    if(!narxi || !sayohat_muddati || !shahar_nomi || !chiptalar_soni || !sayohat_vaqti){
        return errorMessage(res,400,"Malumotlar to'liq kiritilamdi!!")
    }

    const paket = await Paket.create({
        narxi,
        sayohat_muddati,
        shahar_nomi,
        chiptalar_soni,
        sayohat_vaqti
    })
    
    const sity = await Sity.findOne({name: shahar_nomi})

    if(sity){
        const arr = sity.paket_turlari
        arr.push(paket._id)

        await Sity.findOneAndUpdate({name: shahar_nomi}, {paket_turlari: arr})
    }


    res.status(201).json({
        paket
    })

 } 
 catch (error) {  errorMessage(res,500,error.message)  }
}


// Description        All Paket
// Route              GET    /api/trevel/paket/all
exports.allPaket = async (req,res)=>{
 try {
    const paket = await  Paket.find()

    res.status(200).json({
        paketlar: paket
    })
 } 
 catch (error) {  errorMessage(res,500,error.message)  }
}


// Description        Delete Paket
// Route              GET   /api/trevel/paket/delete/:id
exports.deletePaket = async (req,res)=>{
 try {
    await Paket.findOneAndDelete({_id: req.params.id})

    res.status(200).json({
        message: "Paket o'chirildi!!"
    })
 } 
 catch (error) { errorMessage(res,500,error.message) }
}


// Description        One Paket Open
// Route              GET   /api/trevel/paket/one/:id
exports.onePaketById = async (req,res)=>{
 try {
    const paket = await Paket.findOne({_id: req.params.id})

    res.status(200).json({
        paket
    })
 } 
 catch (error) {  errorMessage(res,500,error.message)  }
}

// Description        Barcha chipta sotib olganlar
// Route              GET   /api/trevel/paket/users/all
exports.allUsers = async (req,res)=>{
 try {
    const mijoz = await Mijoz.find()

    res.status(200).json({
        mijozlar: mijoz
    })
 } 
 catch (error) {  errorMessage(res,500,error.message)  }
}