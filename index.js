const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const route = require("./src/routes/route")
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://group22:1234@group22databse.uvtoalh.mongodb.net/input-box", { useNewUrlParser:true})
.then(()=> console.log("Connected to MongoDb"))
.catch((err)=> console.error(err));



app.use('/', route);

const port = 3001;
app.listen(port,()=>{
    console.log(`Server started on PORT: ${port}`)
});