const mongoose = require('mongoose')

const botModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    chatId: {
        type: Number,
        required: true
    },
    isFollow: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model("BotUser", botModel)