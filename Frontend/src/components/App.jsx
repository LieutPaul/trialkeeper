import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import axios from 'axios';
import CreateArea from "./CreateArea";


function App() {
  const [notes, changeNotes] = React.useState([]);
  
  React.useEffect(() => {
    fetch('http://localhost:4000/getNotes')
      .then((res) => res.json())
      .then((jsonRes) => {
        if(jsonRes.length>0){
          changeNotes(jsonRes)
        }
      })
  }, [])

  async function postAllNotes(){
    try{
      await axios.post("http://localhost:4000/postAllNotes" , {
        notes
      })
    }catch(error){
      console.log(error);
    }
  }

  async function postNote(obj){
    try{
      await axios.post("http://localhost:4000/postNote" , {
        obj
      })
    }catch(error){
      console.log(error);
    }
  }
  
  // React.useEffect(()=>{
  //   postAllNotes();
  // },[notes]);
  

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
    postNote({
      title:t,
      content:c
    })
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
