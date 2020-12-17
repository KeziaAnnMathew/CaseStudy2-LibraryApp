const mongoose =require("mongoose");
mongoose.connect('mongodb+srv://userone:userone@libraryfiles.ryw28.mongodb.net/atheneaum?retryWrites=true&w=majority');
const Schema= mongoose.Schema;


const UserSchema = new Schema({
    fname:String,
    lname:String,
    username:String,
    email:String,
    password:String
});

var Userdata = mongoose.model('userdata', UserSchema);

module.exports = Userdata;