const mongoose =require("mongoose");
mongoose.connect('mongodb+srv://userone:userone@libraryfiles.ryw28.mongodb.net/atheneaum?retryWrites=true&w=majority');
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