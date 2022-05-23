const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    passWord: {
        type: String,
        require: true
    },
    subscribe: {
        type: Boolean,
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('UserModel', userSchema);