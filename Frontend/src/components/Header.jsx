import React from "react";
import {Link} from "react-router-dom";
import { useNotes } from "./NoteContext";
import { useNavigate } from "react-router-dom";
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
          <h1 style={{"float":"right","cursor": "pointer"}} onClick={()=>{
            changeSignUp(true);
            localStorage.removeItem("jwt")
            navigate("/");
            // Post request to backend to remove globalUser
          }}>Logout</h1>
        }
      
    </header>
  );
}

