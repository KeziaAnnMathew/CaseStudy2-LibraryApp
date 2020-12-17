const mongoose =require("mongoose");
mongoose.connect('mongodb://localhost:27017/atheneaum');
const Schema= mongoose.Schema;


const AuthorSchema = new Schema({
    name:String,
    book:String,
    genre:String,
    img:String,
    details:String,
    link:String
});

var Authordata = mongoose.model('authordata', AuthorSchema);

module.exports = Authordata;