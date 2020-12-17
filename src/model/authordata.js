const mongoose =require("mongoose");
mongoose.connect('mongodb+srv://userone:userone@libraryfiles.ryw28.mongodb.net/atheneaum?retryWrites=true&w=majority');
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