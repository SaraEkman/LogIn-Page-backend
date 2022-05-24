const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String
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