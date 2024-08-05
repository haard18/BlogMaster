const mongoose  = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    user : {
        type  : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag : {
        type: String,
        default :"General"
    },
    date : {
        type: Date,
        default: Date.now
    }
});


const posts = mongoose.model('posts', postSchema);
module.exports = posts;