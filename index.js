const express=require('express');
const morgan=require('morgan');
const app=express();

//bodyparser
app.use(express.json());

//logger
app.use(morgan('dev'));

app.get("/",(req,res)=>{
    res.send("Hello Welcome to the public library");
})
app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
});