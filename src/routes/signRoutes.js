const express = require('express');
const signRouter=express.Router();
const Userdata=require("../model/userdata");
const Bookdata= require("../model/bookdata");
function router(nav){
    signRouter.get('/Signin',function(req,res){
        res.render('signin',{
            nav,
            title: "Library",
            success:''
        })
    });
   signRouter.post('/Signin/validateuser',function(req,res){
        const username=req.body.username;
        const password=req.body.password;
        Userdata.findOne({$or: [{username:username},{email:username}],password:password})
        .then((val)=>{
            if(val){
                if(val.username!="admin"){
                    Bookdata.find()
                    .then(function(books){
                        res.render("userindex",{
                        nav:[
                        {
                            link:'/books/user',name: 'Books'
                        },
                        {
                            link:'/authors/user',name: 'Authors'
                        },
                        {
                            link:'/', name:'Logout'
                        }],
                        title: 'Library',
                        heading: 'Atheneaum',
                        books
                        });
                    });
                }
                else{
                    Bookdata.find()
                    .then(function(books){
                        res.render("index",{
                        nav,
                        title: 'Library',
                        heading: 'Welcome Admin',
                        books
                        });
                    });
                }
            }
            else{
                res.render('signin',{
                    nav,
                    title: "Library",
                    success:'User Not found'
                    
                    
                });
            }
        }) 
        
    });
    
    signRouter.get('/Signup',function(req,res){
        res.render('signup',{
            nav,
            title: "Library"
        })
    })
    signRouter.post('/Signup/adduser',function(req,res){
        var item = {
            fname:req.body.fname,
            lname:req.body.lname,
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        }
        var user= Userdata(item);
        user.save();
        res.redirect("/Signin");
    });
   
    return signRouter;
}




module.exports = router;