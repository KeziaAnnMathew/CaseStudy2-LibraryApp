const mongoose =require("mongoose");
mongoose.connect('mongodb://localhost:27017/atheneaum');
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