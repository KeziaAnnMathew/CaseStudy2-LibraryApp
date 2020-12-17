const express = require('express');
const app= new express();
const Bookdata= require("./src/model/bookdata")
const port = process.env.PORT || 5050;
const nav =[
    {
        link:'/books',name: 'Books'
    },
    {
        link:'/authors',name: 'Authors'
    },
    {
        link:'/addbook',name: 'Add a Book'

    },
    {
        link:'/addauthor',name: 'Add an Author'

    },
    {
        link:'/books/editbook',name: 'Edit A Book'

    },
    {
        link:'/authors/editauthor',name: 'Edit An Author'

    },
    {
        link:'/books/deletebook',name: 'Delete A Book'
    },
    {
        link:'/authors/deleteauthor',name: 'Delete An Author'

    },
    {
        link:'/Signin',name: 'Log In'
    },
    {
        link:'/Signup',name: 'Sign Up'
    },
    {
        link:'/',name: 'Logout'
    }
];
const booksrouter= require('./src/routes/bookRoutes')(nav);
const authorsRouter= require('./src/routes/authorRoutes')(nav);
const addRouter=  require('./src/routes/addRoutes')(nav);
const signRouter= require('./src/routes/signRoutes')(nav);

app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use('/books',booksrouter);
app.use('/',addRouter);
app.use('/',signRouter);
app.use('/authors',authorsRouter);
app.get('/',function(req,res){
    Bookdata.find()
    .then(function(books){
        res.render("home",{
            nav,
            title: 'Library',
            books
        });
    })
});
app.get('/index',function(req,res){
    Bookdata.find()
    .then(function(books){
        res.render("index",{
            nav,
            title: 'Library',
            heading: 'Athenaeum',
            books
        });
    })
   
});
app.get('/userindex',function(req,res){
    Bookdata.find()
    .then(function(books){
        res.render("userindex",{
            nav:[{link:'/books/user', name:'Books'},{link:'/authors/user', name:'Authors'},{link:'/',name: 'Logout'}],
            title: 'Library',
            heading: 'Athenaeum',
            books
        });
    })
   
});


app.listen(port,()=>{
    console.log("Server ready at port:"+port);
});
