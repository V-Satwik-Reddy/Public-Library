require('dotenv').config();
const mongoose=require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const recordsSchema=new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    year:Number
});

const Records=mongoose.model('Records',recordsSchema);
module.exports=Records;
