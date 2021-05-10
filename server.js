const express= require('express')
const mongoose = require ('mongoose')
const app = express();
const path =require('path')
const routes=require('./routes/apiRoutes')
const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use('/',routes);

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/subin-project',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    },
    (err)=>{
        if(err) throw err
        console.log('connected to mongodb')
    }
    );
    if(process.env.NODE_ENV==="production"){
        app.use(express.static("client/build"))
    }



 app.get('*',(req,res)=>{
     res.sendFile(path.resolve(__dirname,"client","build","index.html"))
 })   

app.listen(PORT,()=>console.log(`listening at http://localhost:${PORT}`))