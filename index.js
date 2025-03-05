const express=require('express');
const morgan=require('morgan');
const app=express();
const Records=require('./records');
const mongoose=require('mongoose');
//bodyparser
app.use(express.json());
//logger
app.use(morgan('dev'));


app.get("/books",async (Req,res)=>{
    const records= await Records.find();
    res.send(records);
})


app.get("/",(req,res)=>{
    res.send("Hello Welcome to the public library");
})
app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
});