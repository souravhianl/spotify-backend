const express = require('express');
const mongoose=require('mongoose');

require('dotenv').config();

const app = express();
const port = 8090

mongoose.connect("mongodb+srv://souravhianl:" +
process.env.MONGO_PASSWORD +
"@cluster0.1ica5fa.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((x)=>{
    console.log("Connected to MONGO!")
}).catch((err)=>{
    console.log("Not connected")
})

app.get('/',(req,res)=>{
res.send("HELLO TO THE APP")
})

app.listen(port,()=>{
    console.log("Server running on port " + port)
})