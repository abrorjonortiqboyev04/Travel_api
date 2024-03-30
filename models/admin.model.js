const { Schema, model } = require('mongoose')


const adminModel = Schema({
    name: {
        type: String,
        required: true
    },
    tel_raqam: {
        type: String,
        required: true
    },
    manzil: {
        type: String,
        required: true
    },
    jami_olgan_buyurtmalar_soni: {
        type: Number,
        default: 0
    },
    ish_vaqti: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    parol: {
        type: String,
        required: true
    },
    oyligi: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = model('Admin', adminModel)