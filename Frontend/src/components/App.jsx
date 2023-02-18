import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import axios from 'axios'
import CreateArea from "./CreateArea";
import { useNotes } from "./NoteContext";

function App() {
  const {notes,change_note_id,changeNotes,signup,addToNotes,note_id,deleteNote,changeSignUp} = useNotes();
  
  const getNotes = async () => {
    if(localStorage.getItem("jwt")!==null){
        const response = await axios.get("http://localhost:4000/getNotes",{
          headers:{
            'Authorization' : 'Bearer ' + localStorage.getItem("jwt")
          }
        });
        const user=response.data.user;
        changeSignUp(false);
        var max_id=0;
        if(user.notes.length>0){
          changeNotes(user.notes)
          for(var i=0;i<user.notes.length;i++){
            if(user.notes[i].note_id>max_id){
              max_id=user.notes[i].note_id;
            }
          }
          // The first new note will have an ID one more than the max id of previous notes.
        }
        change_note_id(max_id+1);
    }
  }
  React.useEffect(()=>{
    getNotes();
  },[])



  return (
    <div>
      <Header signup={signup}/>
      <CreateArea onSubmit={addToNotes} id={note_id} />
      {notes.map((note, index) => (
        <Note
          id={note.note_id}
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
