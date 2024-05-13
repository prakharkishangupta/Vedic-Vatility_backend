const mongoose = require('mongoose');
const { Schema } = mongoose;

const assesmentSchema = new Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:'user'},
    name: { type: String, required: true },
    phone: { type: String, required: true},
    age: { type: String, required: true },
    gender: { type: String, required: true },
    problem: { type: String, required: true },
    sleep: { type: String, required: true },
    level: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('assesment', assesmentSchema);