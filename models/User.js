const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// Create Schema 模型
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // avatar: {
    //     type: String
    // },
    // date: {
    //     type: Date,
    //     required: Date.now
    // },
})

module.exports = User = mongoose.model("users", UserSchema);