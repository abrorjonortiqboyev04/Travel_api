const { Schema, model } = require('mongoose')

const mijozModel = Schema({
    paket_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user_tel_nomer: {
        type: String,
        required: true,
        unique: true
    },
    user_name: {
        type: String,
        required: true 
    },
    user_manzil: {
        type: String,
        required: true
    },
    odamlar_soni: {
        type: Number,
        required: true
    },
    buyurtma_vaqti: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = model("Mijoz", mijozModel)