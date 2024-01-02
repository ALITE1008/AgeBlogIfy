require('dotenv').config()
const PORT = process.env.PORT;

const express = require('express');
const path = require('path');

const {connectToMongoDb} = require('./connection');
connectToMongoDb(process.env.MONGO_URL)
.then(()=>{console.log('MongoDbConnected')})
.catch((err)=>{console.log(err)});;


const cookieparser = require('cookie-parser');
const {checkForAuthenticationcookie} = require('./middleware/authentication');


const UserRoute = require('./routes/user');
const blogRouter = require('./routes/blog');
const homeRouter = require('./routes/home');

const app = express();

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));



app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkForAuthenticationcookie("token"));
app.use(express.static(path.resolve('./public')));


app.use('/user',UserRoute);
app.use('/blog',blogRouter);
app.use('/' ,homeRouter);


app.listen(PORT,()=>{console.log(`Server started on Port:${PORT}`)});