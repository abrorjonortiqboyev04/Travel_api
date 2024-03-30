const { Schema, model} = require('mongoose')


const commentModel = Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    sity: {
        type: Schema.Types.ObjectId,
        required: true
    }        
}, {
    timestamps: true
})

module.exports = model('Comment', commentModel)