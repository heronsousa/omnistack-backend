const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);