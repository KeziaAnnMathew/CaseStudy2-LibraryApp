const express = require('express');
const authorsRouter=express.Router();
const Authordata= require("../model/authordata");

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
    authorsRouter.get('/',function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("authors",{
                nav:[
                {
                    link:'/index', name:'Home'
                },
                {
                    link:'/books',name: 'books'
                },
                {
                    link:'/addauthor',name: 'Add An Author'
            
                },
                {
                    link:'/authors/editauthor',name: 'Edit An Author'
            
                },
                {
                    link:'/authors/deleteauthor',name: 'Delete An Author'
                },
                {
                    link:'/',name: 'Logout'
                }
                ],
                title: 'Library',
                authors
            });
        })
    });
    authorsRouter.get('/user',function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("userauthors",{
                nav:[
                {
                    link:'/userindex', name:'Home'
                },
                {
                    link:'/books/user', name:'Books'
                },
                {
                    link:'/', name:'Logout'
                }
                ],
                title: 'Library',
                authors
            });
        })
    });
    authorsRouter.get('/user/:id',function(req,res){
        const id=req.params.id
        Authordata.findOne({_id : id})
        .then(function(author){
            res.render("author",{
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
                author
            });
        });
    });
    authorsRouter.get('/editauthor',function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("editauthor",{
                nav,
                title: 'Library',
                authors
            });
        })
    });
    authorsRouter.get('/editauthor/editform/:id',function(req,res){
        const id=req.params.id;
        Authordata.findOne({_id : id})
        .then(function(author){
            res.render("editauthorform",{
                nav,
                title: 'Library',
                author
            });
        });
    });
    authorsRouter.post('/editauthor/editform/:id/edit',upload,function(req,res){
        const id=req.params.id;
        var item = {
            name:req.body.name,
            author:req.body.author,
            genre:req.body.genre,
            details:req.body.details,
            img:req.file.filename,
            link:req.body.link
        }
        Authordata.findOneAndUpdate({_id:id}, item, {returnOriginal:false})
        .then(()=>{
            res.redirect('/authors')
        })
    });
    authorsRouter.get('/deleteauthor',function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("deleteauthor",{
                nav,
                title: 'Library',
                authors
            });
        })
    });
    authorsRouter.get('/deleteauthor/delete/:id',function(req,res){
        const id=req.params.id;
        Authordata.deleteOne({_id : id})
        .then(()=>{
            res.redirect('/authors');
            });
    });
    authorsRouter.get('/:id',function(req,res){
        const id=req.params.id
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render("author",{
                nav:[
                    {
                        link:'/index', name:'Home'
                    },
                    {
                        link:'/books',name: 'books'
                    },
                    {
                        link:'/addauthor',name: 'Add An Author'
                
                    },
                    {
                        link:'/authors/editauthor',name: 'Edit An Author'
                
                    },
                    {
                        link:'/authors/deleteauthor',name: 'Delete An Author'
                    },
                    {
                        link:'/',name: 'Logout'
                    }
                    ],
                title: 'Library',
                author
            });
        })
    });

    return authorsRouter;
}




module.exports = router;