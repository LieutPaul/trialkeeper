import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from "./App";
import SignUpPage from "./Signup";


function App2() {
  return (
    <div>
    <Router>
      
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/signup" element={<SignUpPage />}/>
      </Routes>

    
    </Router>
    
    
    </div>
  );
}

export default App2;
