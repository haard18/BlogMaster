const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
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
    bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    },
    sociallinks: {
        twitter: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Users = mongoose.model('users', userSchema);
Users.createIndexes();
module.exports = Users;