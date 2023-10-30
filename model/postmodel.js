const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: String,
    image: String,
    specialization: String,
    experience: Number,
    location: String,
    date: String,
    slots: Number,
    fee: Number
}, {
    versionKey: false
})

const postModel = mongoose.model('posts', postSchema)

module.exports = { postModel }