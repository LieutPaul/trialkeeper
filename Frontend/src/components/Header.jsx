import React from "react";
import {Link} from "react-router-dom";

function Header() {
  return (
    <header>
      <Link  style={{
        cursor: "pointer"
      }}to="/"><h1>Keeper</h1>
      </Link>
      
      <Link  style={{
        float:"right",
        cursor: "pointer"
      }}to="/signup"><h1>SignUp</h1>
      </Link>
    </header>
  );
}


export default Header;
