const mongoose = require('mongoose');
const mongo_uri = 'mongodb+srv://DevPatils:DevPatils@cluster0.mywzttp.mongodb.net/BlogMaster?retryWrites=true&w=majority';

const connecttoMongo = () => {
    try{
        mongoose.connect(mongo_uri);
        console.log('Connected to MongoDB');    
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connecttoMongo;