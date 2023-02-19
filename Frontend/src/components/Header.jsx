import React from "react";
import {Link} from "react-router-dom";
import { useNotes } from "./NoteContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function Header() {
  const navigate = useNavigate();
  const {signup,changeSignUp} = useNotes();
  return (
    <header>
      <Link  style={{
        cursor: "pointer"
      }}to="/"><h1>Keeper</h1>
      </Link>

        {signup &&
          <Link  style={{
            "float":"right",
            "cursor": "pointer"
          }}to="/signup"><h1>SignUp</h1>
          </Link>
        }

        {!signup &&
          <h1 style={{"float":"right","cursor": "pointer"}} onClick={async ()=>{
            changeSignUp(true);
            await axios.post("http://localhost:4000/logout" , {}, {
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem("jwt")
                }
            })
            localStorage.removeItem("jwt")
            navigate("/");
          }}>Logout</h1>
        }
      
    </header>
  );
}

