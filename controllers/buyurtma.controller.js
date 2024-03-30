const Order = require('../models/buyurtma.model')
const Sity = require('../models/sity.model')
const Paket = require('../models/paket.model')
const Mijoz = require('../models/mijoz.model')
const errorMessage = require('../utils/errorMessage')


// Description        Add New Order
// Route              POST  /api/trevel/order/add/:id
exports.addOrder = async (req,res)=>{
 try {
    const { odamlar_soni, user_manzil, user_name, user_tel_nomer } = req.body

    const paket = await Paket.findOne({_id: req.params.id})

    if(paket.chiptalar_soni < 1){
        return  errorMessage(res,200,"Paketda chiptalar tugagan!!")
    }

    const buyurtma_berganlar = paket.buyurtma_berganlar+1

    await Paket.findOneAndUpdate({_id: req.params.id}, {buyurtma_berganlar})

    const watch = new Date().toLocaleString()

    const order = {
        paket_id: req.params.id,
        user_name,
        user_tel_nomer,
        odamlar_soni,
        user_manzil,
        buyurtma_vaqti: watch
    }

    const newOrder = await Order.create(order)

    const sity = await Sity.findOne({name: paket.shahar_nomi})

    if(sity){
        const arr = sity.buyurtma_berganlar
        arr.push(newOrder._id)

        await Sity.findOneAndUpdate({name: paket.shahar_nomi}, {buyurtma_berganlar: arr})
    }

    res.status(201).json({
       newOrder
    })
 } 
 catch (error) { errorMessage(res,500,error.message) }
}


// Description          Shopping 
// Route                GET  /api/trevel/order/shopping/:id
exports.shopping = async (req,res)=>{
 try {

   const order = await Order.findOne({_id: req.params.id})

   const paket = await Paket.findOne({_id: order.paket_id})
   
   const sotib_olganlar = paket.sotib_olganlar + 1
   const chiptalar_soni = paket.chiptalar_soni - order.odamlar_soni
   
   await Paket.findOneAndUpdate({_id: order.paket_id}, {sotib_olganlar, chiptalar_soni})
   
   const { paket_id, user_name, user_tel_nomer, odamlar_soni, buyurtma_vaqti, user_manzil} = order

   const mijoz = await Mijoz.create({
      paket_id,
      user_name,
      user_manzil,
      user_tel_nomer,
      odamlar_soni,
      buyurtma_vaqti
   })

   const sity = await Sity.findOne({name: paket.shahar_nomi})

    if(sity){
        const arr = sity.hozir_sayohatdagilar
        arr.push(mijoz._id)

        await Sity.findOneAndUpdate({name: paket.shahar_nomi}, {hozir_sayohatdagilar: arr})
    }

   await Order.findOneAndDelete({_id: req.params.id})

   res.status(200).json({
      message: "Sotildi👌, Mijozlar ro'yhatiga qo'shildi!!"
   })
 } 
 catch (error) { errorMessage(res,500,error.message)  }
}


// Description     All Order
// Route           GET  /api/trevel/order/all
exports.allOrder = async (req,res)=>{
 try {
   const orders = await Order.find()

   res.status(200).json({
      orders
   })
 } 
 catch (error) { errorMessage(res,500,error.message)  }
}


// Description          Not Shopping
// Route                GET  /api/trevel/order/shopping/:id
exports.notShopping = async (req,res)=>{
 try {
   await Order.findOneAndDelete({_id: req.params.id})

   res.status(200).json({
      message: "Sotilmadi😒"
   })
 } 
 catch (error) { errorMessage(res,500,error.message) }
}