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

app.get("/getNotes",(req,res)=>{
    Note_model.find({},(err,notes)=>{
        res.send(notes)
    })
})


app.post("/postNote", (req,res) => {
    console.log(req.body.obj);
    Note_model.create(req.body.obj);
});

app.post("/signup", (req,res) =>{
    console.log(req.body);
    const userFromFrontEnd = req.body.obj;
    User_model.register({"username":userFromFrontEnd.username},userFromFrontEnd.password,function(err,user){
        if(err){
            console.log(err);
            res.send("UserExists")
        }else{
            passport.authenticate("local",{failureRedirect:'/signuperror',failureMessage: true })(req,res,function(){
                console.log("User Added successfully");
                // res.redirect("/");
            });
        }
    });
});

app.post("/deleteANote",(req,res)=>{
    noteid=req.body.obj.id;
    console.log(noteid);
    Note_model.findOneAndDelete({note_id:noteid},(err,docs)=>{
        if(err){
            console.log(err);
        }else{
            console.log(docs);
        }
    })
    
});
app.listen(4000,()=>{
    console.log("Listening on 4000");
})