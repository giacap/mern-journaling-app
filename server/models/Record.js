const mongoose = require('mongoose')


const RecordSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add some text']
    },
    tags: {
        type: Array,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdatedAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Record', RecordSchema)