require('dotenv').config();
const connectDB=require('./server/config/db');
const express=require('express');
const expressLayout=require('express-ejs-layouts');

const cookieParser=require('cookie-parser');
const mongoStore=require('connect-mongo');
const session=require('express-session');

const methodOverride=require('method-override');
const fileUpload=require('express-fileupload')

const PORT =process.env.PORT;

const app=express();

app.use(express.static('public'))
app.use(expressLayout);
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(fileUpload());
app.set('layout','./layouts/main');
app.set('view engine','ejs')

app.use(session({
    secret:'ases',
    resave:false,
    saveUninitialized:true,
    store:mongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    })
}))

app.use('/',require('./server/routes/main'))
app.use('/',require('./server/routes/admin'))

app.listen(PORT,()=>{
    console.log(`${PORT}. port dinleniyor`);
    connectDB();
})