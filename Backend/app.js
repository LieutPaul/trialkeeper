require('dotenv').config()
const express=require('express');
const cors=require('cors');
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');
mongoose.set('strictQuery', false);

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/keeperDB",{useNewURLParser:true});

const noteSchema = new mongoose.Schema({
    note_id : Number,
    title : String,
    content : String
});

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    notes: [noteSchema]
})

const User_model = new mongoose.model("User",UserSchema);

app.post("/signup", (req,res) =>{
    console.log(req.body);
    const userFromFrontEnd = req.body.obj;
    
    User_model.findOne({username: userFromFrontEnd.username }, (err, docs) => {
        if(err){
            console.log(err)
            res.send(false);
        }
        else{
            if(docs){
                console.log("User exists.")
                res.send(false); // User exists
            }else{
                var user = new User_model({
                    username:userFromFrontEnd.username,
                    password:userFromFrontEnd.password,
                    notes:[]
                });
                user.save();
                console.log("User Added.")
                jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,(err,token)=>{
                    res.send(token);
                })
            }
        }
    });
});

app.post("/login", (req,res)=>{
    console.log(req.body.obj);
})


app.get("/getNotes",(req,res)=>{

})


app.post("/postNote", (req,res) => {
    console.log(req.body.obj);
});


app.post("/deleteANote",(req,res)=>{
    noteid=req.body.obj.id;
    console.log(noteid);
    
});
app.listen(4000,()=>{
    console.log("Listening on 4000");
})