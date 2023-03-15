const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const route = require("./src/routes/route")
const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: ["http://localhost:3000", "https://velvety-lolly-85a0f2.netlify.app/"]
}))

// Add the middleware function here
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  

mongoose.connect("mongodb+srv://group22:1234@group22databse.uvtoalh.mongodb.net/input-box", { useNewUrlParser:true})
.then(()=> console.log("Connected to MongoDb"))
.catch((err)=> console.error(err));



app.use('/', route);

const port = 3001;
app.listen(port,()=>{
    console.log(`Server started on PORT: ${port}`)
});
