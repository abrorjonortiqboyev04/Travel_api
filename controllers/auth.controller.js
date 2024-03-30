const Admin = require('../models/admin.model')
const bcrypt = require('bcryptjs')
const errorMessage = require('../utils/errorMessage')

// Description        Add New Admin
// Route              POST   /api/trevel/admin/add
exports.addNewAdmin = async (req,res)=>{
 try {
    const { name, tel_raqam, manzil, ish_vaqti, login, parol, oyligi } = req.body

    if(!oyligi || !name || !tel_raqam || !manzil || !ish_vaqti || !login || !parol){
        return errorMessage(res,400,"Malumotlar to'liq kiritilmadi!!")
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(parol, salt)
    
    const newAdmin = await Admin.create({
        name,
        tel_raqam,
        manzil,
        ish_vaqti,
        login,
        parol: hashPassword,
        oyligi
    })

    return res.status(201).json({
        admin: newAdmin
    })

 } 
 catch (error) { return errorMessage(res,500,error.message) }
}

// Description       Login Admin
// Route             /api/trevel/admin/login
exports.loginAdmin = async (req,res)=>{
 try {
    const { login, parol  } = req.body

    const admin = await Admin.findOne({login})

    if(!admin){
        return errorMessage(res,400,"Malumotlar noto'g'ri kiritildi!!")
    }

    const hashPassword = await bcrypt.compare(parol, admin.parol)

    if(!hashPassword){
        return errorMessage(res,400,"Malumotlar noto'g'ri kiritildi!!")
    }

    res.status(200).json({ admin })
 } 
 catch (error) { return errorMessage(res,500,error.message) }
}

