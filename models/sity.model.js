const { Schema, model } = require('mongoose')


const sityModel = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    joylashuv: {
        type: String,
        required: true
    },
    rasm:[ 
        {
            type: String,
            required: true
        } 
    ],
    foydalanuvchilar_rasmi: [ 
        {
            type: String
        } 
    ],
    paket_turlari: [
        {
            type: Schema.Types.ObjectId
        }
    ],
    hozir_sayohatdagilar: [
        {
            type: Schema.Types.ObjectId
        }
    ],
    buyurtma_berganlar: [
        {
            type: Schema.Types.ObjectId
        }
    ]
}, {
    timestamps: true
})


module.exports = model("Sitys", sityModel)