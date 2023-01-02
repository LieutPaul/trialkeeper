const express=require('express');
const cors=require('cors');

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Working");
})

app.post("/post", (req,res) =>{
    console.log(req.body);
});

app.post("/postobj", (req,res) =>{
    console.log(req.body);
});
app.post("/signup", (req,res) =>{
    console.log(req.body);
});

app.listen(4000,()=>{
    console.log("Listening on 4000");
})