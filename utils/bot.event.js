const BotModel = require('../models/botUser.model')
const Paket = require('../models/paket.model')
const Mijoz = require('../models/mijoz.model')

// Description        New User Create
// Msg                /start
exports.newUser = async (msg)=>{
    const users = await BotModel.findOne({chatId:msg.chat.id})
    if(!users){
        const user = {
            name: msg.chat.first_name,
            chatId: msg.chat.id
        }
        await BotModel.create(user)
    }
}


exports.isFollow = async (msg)=>{
    const user = await BotModel.findOne({chatId: msg.chat.id})

    if(!user){
        return false
    }

    return true
}


exports.user = async(msg, newBot)=>{
 try {
    const tel_number = msg.text

    const mijoz = await Mijoz.findOne({user_tel_nomer: tel_number})

    if(!mijoz){
        return await newBot.sendMessage(msg.chat.id, `Noto'g'ri malumot yuborildi!!`)
    }
    
    const paket = await Paket.findOne({_id: mijoz.paket_id})
    
    return await newBot.sendMessage(msg.chat.id, `
Mijoz malumotlari: 
🤵Ism: ${mijoz.user_name}
📞Tlefon raqam: ${mijoz.user_tel_nomer}
🏠Manzil: ${mijoz.user_manzil}
⌚Buyurtma vaqti: ${mijoz.buyurtma_vaqti}

Sayohat malumotlari: 
🏯Shahar: ${paket.shahar_nomi}
📈Sayohat muddati: ${paket.sayohat_muddati}
💸Narxi: ${paket.narxi}
⏰Sayohat vaqti: ${paket.sayohat_vaqti}
    `)
 } 
 catch (error) {
    console.log(error)
 }
}
