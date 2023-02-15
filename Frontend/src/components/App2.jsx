import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from "./App";
import SignUpPage from "./Signup";
import LoginPage from "./Login";

function App2() {
  return (
    <div>
    <Router>
      
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>

    
    </Router>
    
    
    </div>
  );
}

export default App2;
