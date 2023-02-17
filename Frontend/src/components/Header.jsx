import React from "react";
import {Link} from "react-router-dom";
import { useNotes } from "./NoteContext";

export default function Header() {

  const {signup} = useNotes();
  return (
    <header>
      <Link  style={{
        cursor: "pointer"
      }}to="/"><h1>Keeper</h1>
      </Link>

        {signup &&
          <Link  style={{
            float:"right",
            cursor: "pointer"
          }}to="/signup"><h1>SignUp</h1>
          </Link>
        }

        {!signup &&
          <h1>Logout</h1>
        }
      
    </header>
  );
}

