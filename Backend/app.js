require('dotenv').config()
const express=require('express');
const cors=require('cors');
const bcrypt = require('bcrypt')
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

function authenticateToken(req,res,next) { //MiddleWare to check if JWT is valid
    //Header - Bearer TOKEN
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    req.token=token
    // console.log("Token is "+token)
    if(token==null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err){
            res.sendStatus(403); //Invalid Token => No Access
        }
        req.user = user;
        next();
    })
}

app.post("/signup", async (req,res) =>{
    // console.log(req.body);
    const userFromFrontEnd = req.body.obj;
    const hashedPassword = await bcrypt.hash(userFromFrontEnd.password,10);
    
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
                    password:hashedPassword,
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

app.post("/login", async (req,res)=>{
    // console.log(req.body.obj);
    const userFromFrontEnd = req.body.obj;
    User_model.findOne({username: userFromFrontEnd.username }, (err, user) => {
        if(err){
            console.log(err)
            res.send(false); // No user with given username
        }
        else{
            if(user){
                bcrypt.compare(userFromFrontEnd.password, user.password, (err, data) => {
                    if(err){
                        console.log(err);
                        res.send(false);
                    }
                    if(data){
                        jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,(err,token)=>{
                            res.send(token);
                        })
                    }else{
                        res.send("Wrong Password")
                    }
                });
            }else{
                res.send(false);
            }
        }
    });
})

app.get("/getNotes",authenticateToken,(req,res)=>{
    User_model.findOne({username : req.user.user.username},(err,foundUser)=>{
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                res.json(foundUser)
            }
        }
    });
})

app.post("/postNote",authenticateToken,(req,res) => {
    const note = req.body.note;
    // console.log(note,req.user)
    User_model.findOne({username : req.user.user.username},(err,foundUser)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(foundUser)
            if(foundUser){
                foundUser.notes.push(note);
                foundUser.save();
            }
        }
    });
    res.send("Added")
});

app.post("/deleteANote",authenticateToken,(req,res)=>{
    User_model.findOne({username : req.user.user.username},(err,foundUser)=>{
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                const id = req.body.obj.id
                foundUser.notes=foundUser.notes.filter((item) => {
                    return (item.note_id) !== id;
                });
                // console.log(foundUser);
                foundUser.save();
                res.send("Deleted")
            }
        }
    });
});

app.post("/logout",authenticateToken,(req,res)=>{
    // console.log("Log out token - " + req.token)
    res.send("Logged out user")
});


app.listen(4000,()=>{
    console.log("Listening on 4000");
})