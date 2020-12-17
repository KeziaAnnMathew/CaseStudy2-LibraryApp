const express = require('express');
const addRouter=express.Router();
const Bookdata=require("../model/bookdata");
const Authordata=require("../model/authordata");
const multer= require ('multer');
const path=require('path');
const storage=multer.diskStorage({
        destination:'./public/images/',
        filename:function(req,file,cb){
            cb(null,file.fieldname+'-'+Date.now() + path.extname(file.originalname));
        }
});
const upload=multer({
    storage:storage
}).single('img');

function router(nav){
    addRouter.get('/addbook',function(req,res){
        res.render('addbook',{
            nav,
            title: 'Library',
            heading: 'Add Book'
        });
       
    });
    addRouter.post('/addbook/add',upload,function(req,res){
        var item = {
            title:req.body.title,
            author:req.body.author,
            genre:req.body.genre,
            details:req.body.details,
            img:req.file.filename,
            link:req.body.link
        }
        var book= Bookdata(item);
        book.save();
        res.redirect("/books");
        
    });
    addRouter.get('/addauthor',function(req,res){
        res.render("addauthor",{
            nav,
            title: 'Library',
            heading: 'Add Author'
        });
    });
    addRouter.post('/addauthor/add',upload,function(req,res){
        var item = {
            name:req.body.name,
            book:req.body.book,
            genre:req.body.genre,
            details:req.body.details,
            img:req.file.filename,
            link:req.body.link
        }
        var author= Authordata(item);
        author.save();

        res.redirect("/authors");
    });

    return addRouter;
}




module.exports = router;