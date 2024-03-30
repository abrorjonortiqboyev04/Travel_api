const { Schema, model } = require('mongoose')


const paketModel = Schema({
    shahar_nomi: {
        type: String,
        required: true
    },
    sayohat_muddati: {
        type: String,
        required: true
    },
    narxi: {
        type: String,
        required: true
    },
    sotib_olganlar: {
        type: Number,
        default: 0
    },
    buyurtma_berganlar: {
        type: Number,
        default: 0
    },
    chiptalar_soni: {
        type: Number,
        required: true
    },
    sayohat_vaqti: {
        type: String,
        required: true
    }
}, {
    timestamps: true
  })


module.exports = model("Paket", paketModel)