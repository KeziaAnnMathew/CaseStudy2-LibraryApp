const mongoose =require("mongoose");
mongoose.connect('mongodb://localhost:27017/atheneaum');
const Schema= mongoose.Schema;


const BookSchema = new Schema({
    title:String,
    author:String,
    genre:String,
    img:String,
    details:String,
    link:String
});

var Bookdata = mongoose.model('bookdata', BookSchema);

module.exports = Bookdata;