const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const session = require('express-session')
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/keeperDB",{useNewURLParser:true});

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use(session({
    secret : "Our little secret.", 
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());


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

UserSchema.plugin(passportLocalMongoose);
const User_model = new mongoose.model("User",UserSchema);

passport.use(User_model.createStrategy());
passport.serializeUser(User_model.serializeUser());
passport.deserializeUser(User_model.deserializeUser());



app.post("/signup", (req,res) =>{
    console.log(req.body);
    const userFromFrontEnd = req.body.obj;
    User_model.register(({username: userFromFrontEnd.username}), userFromFrontEnd.password, (err, user) => {
        if(err) {
            console.log(err);
            res.send(false);
        }else{
            passport.authenticate('local', (req, res) => {
            })
            res.send(true);
        }
    })
});

app.post("/login", (req,res)=>{
    console.log(req.body.obj);
})


app.get("/getNotes",(req,res)=>{
    if(req.isAuthenticated()){
        console.log("authenticated.")
        User_model.findOne({username : req.user.username},(err,foundUser)=>{
            if(err){
                console.log(err);
            }else{
                console.log(foundUser);
                if(foundUser){
                    res.send(foundUser)
                }else{
                    res.send({"as":"as"});
                }
            }
        });
    }else{
        console.log("Not Authenticated.")
        res.send({"as":"as"});
    }
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