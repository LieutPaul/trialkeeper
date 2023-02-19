import React from 'react'
import Header from "./Header";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    async function post(){
        const obj={
            username:username,
            password:password
        }
        try{
            const response = await axios.post("http://localhost:4000/login" , {
                obj
            });
            console.log(response.data) // false means user doesn't exist
            if(response.data===false){
                changeWrongPassword(false);
                changeUserDoesntExist(true);
            }else if(response.data==="Wrong Password"){
                changeUserDoesntExist(false);
                changeWrongPassword(true);
            }else{
                localStorage.setItem("jwt",response.data);
                navigate("/");
            }
        }catch(error){
            console.log(error);
        }
    }
    const [wrongPassword, changeWrongPassword] = React.useState(false);
    const [userDoesntExist, changeUserDoesntExist] = React.useState(false);
    const [username, changeUsername] = React.useState(""); //Can change to useRef
    const [password, changePassword] = React.useState("");
    
    return (
        <>
            <Header />
            <form>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
                <div style={{"textAlign":"center"}}>
                    <h1>Login</h1>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(event)=>{
                        changeUsername(event.target.value);
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event)=>{
                        changePassword(event.target.value);
                    }}/>
                </div>

                { wrongPassword &&
                <p style={{"color":"red"}}>Wrong Password.</p>
                }

                { userDoesntExist &&
                <p style={{"color":"red"}}>User does not Exist.</p>
                }
            </form>
            <div style={{textAlign: "center"}}>
                <button type="submit" className="btn btn-primary" onClick={(event)=>{
                    event.preventDefault();
                    post();
                }}>Submit</button>
            </div>
        </>
    )
}
