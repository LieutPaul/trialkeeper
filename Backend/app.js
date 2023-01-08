const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/keeperDB",{useNewURLParser:true});

const noteSchema = new mongoose.Schema({
    title : String,
    content : String
});

const Note_model = new mongoose.model("Note",noteSchema);

app.get("/getNotes",(req,res)=>{
    Note_model.find({},(err,notes)=>{
        res.send(notes)
    })
})

app.post("/postAllNotes",(req,res)=>{
    console.log(req.body);
});

app.post("/postNote", (req,res) => {
    Note_model.create(req.body.obj);
});

app.post("/signup", (req,res) =>{
    console.log(req.body);
});

app.listen(4000,()=>{
    console.log("Listening on 4000");
})