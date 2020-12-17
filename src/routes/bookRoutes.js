const express = require('express');
const booksrouter=express.Router();
const Bookdata= require("../model/bookdata")

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
    booksrouter.get('/',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("books",{
                nav:[
                {
                    link:'/index', name:'Home'
                },
                {
                    link:'/authors',name: 'Authors'
                },
                {
                    link:'/addbook',name: 'Add a Book'
            
                },
                {
                    link:'/books/editbook',name: 'Edit A Book'
            
                },
                {
                    link:'/books/deletebook',name: 'Delete A Book'
                },
                {
                    link:'/',name: 'Logout'
                }
                ],
                title: 'Library',
                books
            });
        })
        
    });
    booksrouter.get('/editbook',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("editbook",{
                nav,
                title: 'Library',
                books
            });
        })
    });
    booksrouter.get('/user',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("userbooks",{
                nav:[
                {
                    link:'/userindex', name:'Home'
                },
                {
                    link:'/authors/user', name:'Authors'
                },
                {
                    link:'/', name:'Logout'
                }
                ],
                title: 'Library',
                books
            });
        })
    });
    booksrouter.get('/user/:id',function(req,res){
        const id=req.params.id
        Bookdata.findOne({_id : id}) 
        .then(function(book){
            res.render("book",{
                nav:[
                    {
                        link:'/userindex', name:'Home'
                    },
                    {
                        link:'/books/user', name:'Books'
                    },
                    {
                        link:'/authors/user', name:'Authors'
                    },
                    {
                        link:'/', name:'Logout'
                    }
                ],
                title: 'Library',
                book
            });
        });
    });
    booksrouter.get('/editbook/editform/:id',function(req,res){
        const id=req.params.id;
        Bookdata.findOne({_id : id})
        .then(function(book){
            res.render("editbookform",{
                nav,
                title: 'Library',
                book
            });
        });
    });
    booksrouter.post('/editbook/editform/:id/edit',upload,function(req,res){
        const id=req.params.id;
        var item = {
            title:req.body.title,
            author:req.body.author,
            genre:req.body.genre,
            details:req.body.details,
            img:req.file.filename,
            link:req.body.link
        }
        Bookdata.findOneAndUpdate({_id:id}, item, {returnOriginal:false})
        .then(()=>{
            res.redirect('/books')
        })
    });
    booksrouter.get('/deletebook',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("deletebook",{
                nav,
                title: 'Library',
                books
            });
        })
    });
    booksrouter.get('/deletebook/delete/:id',function(req,res){
        const id=req.params.id;
        Bookdata.deleteOne({_id : id})
        .then(()=>{
            res.redirect('/books');
            });
    });
    booksrouter.get('/:id',function(req,res){
        const id=req.params.id
        Bookdata.findOne({_id : id})
        .then(function(book){
            res.render("book",{
                nav:[
                    {
                        link:'/index', name:'Home'
                    },
                    {
                        link:'/authors',name: 'Authors'
                    },
                    {
                        link:'/addbook',name: 'Add a Book'
                
                    },
                    {
                        link:'/books/editbook',name: 'Edit A Book'
                
                    },
                    {
                        link:'/books/deletebook',name: 'Delete A Book'
                    },
                    {
                        link:'/',name: 'Logout'
                    }
                    ],
                title: 'Library',
                book
            });
        });
    });
    return booksrouter;
}




module.exports = router;