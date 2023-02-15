import React from "react";
import Header from "./Header";
import axios from 'axios'
function SignUpPage(){
    
    async function post(){
        const obj={
            username:username,
            password:password
        }
        try{
            const response = await axios.post("http://localhost:4000/signup" , {
                obj
            });
            if(response==="UserExists"){
                console.log("User Already Exists")
            }
        }catch(error){
            console.log(error);
        }
    }
    
    const [username, changeUsername] = React.useState(""); //Can change to useRef
    const [password, changePassword] = React.useState("");
    
    return (
        <>
            <Header />
            <form>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(event)=>{
                        changeUsername(event.target.value);
                    }}/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event)=>{
                        changePassword(event.target.value);
                    }}/>
                </div>
            </form>
            <div style={{textAlign: "center"}}>
                <button type="submit" class="btn btn-primary" onClick={(event)=>{
                    event.preventDefault();
                    post();
                }}>Submit</button>
            </div>
        </>
    )
}

export default SignUpPage;