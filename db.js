const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb+srv://sourav:samanta@cluster0.u0c5mxy.mongodb.net/hospital?retryWrites=true&w=majority')


module.exports = { connection }