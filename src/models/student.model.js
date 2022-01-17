const mongoose = require("mongoose")
const studentSchema = mongoose.Schema({
    code: { required: true, type: String, unique: true },
    name: { required: true, type: String },
    dob: { type: Date },
    score: {type: Number}
})
module.exports = mongoose.model('student', studentSchema)