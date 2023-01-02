import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import axios from 'axios';
import CreateArea from "./CreateArea";


function App() {
  const [notes, changeNotes] = React.useState([
    {
      title: "Note title",
      content: "Note content"
    }
  ]);
  
  async function post(){
    try{
      await axios.post("http://localhost:4000/post" , {
        notes
      })
    }catch(error){
      console.log(error);
    }
  }
  
  React.useEffect(()=>{
    post();
  },[notes]);
  

  function addToNotes(t, c) {
    changeNotes((prevValue) => {
      return [
        ...prevValue,
        {
          title: t,
          content: c
        }
      ];
    });
  
  }

  function deleteNote(id) {
    changeNotes((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      
      <Header />
      <CreateArea onSubmit={addToNotes} />
      {notes.map((note, index) => (
        <Note
          id={index}
          key={index}
          title={note.title}
          content={note.content}
          onDeleted={deleteNote}
        />
      ))}
      <Footer />
    
    
    </div>
  );
}

export default App;
