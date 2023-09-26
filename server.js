const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const bodyParser=require('body-parser');
const apiRouter=require("./Route/apiRoute");
const app=express();
app.use('/upload',express.static('upload'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(apiRouter);
const port=process.env.PORT;
const dbDriver=process.env.URL;
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(port,()=>{
        console.log('db is connected');
        console.log(`server is running at http://localhost:${port}/users`);
    })
})
.catch(()=>{
    console.log('error');
})