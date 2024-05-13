const mongoose = require('mongoose');
const { Schema } = mongoose;

const preDataSchema = new Schema({
    problem: { type: String, required: true },
    age: { type: String, required: true },
    level: { type: String, required: true },
    recImage: {type: [String]},
    imageDesc: {type:[String]},
    desc: { type: [String] },
    vedio: { type: [String]},
    courseVedio: { type: [String] },
    courseDesc: { type: [String] },
    vedioDesc: { type: [String] },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('preData', preDataSchema);