import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import axios from 'axios';
import CreateArea from "./CreateArea";


function App() {
  const [notes, changeNotes] = React.useState([]);
  const [note_id,change_note_id] = React.useState(0);
  
  React.useEffect(() => {
    fetch('http://localhost:4000/getNotes')
      .then((res) => res.json())
      .then((jsonRes) => {
        if(jsonRes.length>0){
          changeNotes(jsonRes)
          change_note_id(jsonRes.length)
        }
      })
  }, [])

  async function deleteANote(id){
    const obj={id:id}
    try{
      await axios.post("http://localhost:4000/deleteANote" , {
        obj
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

  function addToNotes(t,c,id) {
    changeNotes((prevValue) => {
      return [
        ...prevValue,
        {
          title: t,
          content: c
        }
      ];
    });
    change_note_id(note_id+1);
    postNote({
      id:id,
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
    deleteANote(id);
  }

  return (
    <div>
      <Header />
      <CreateArea onSubmit={addToNotes} id={note_id} />
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
