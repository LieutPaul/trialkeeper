import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useNotes } from "./NoteContext";


function App() {

  const {notes,change_note_id,changeNotes,signup,addToNotes,note_id,deleteNote} = useNotes();
  
    React.useEffect(() => {
      if(signup){
        fetch('http://localhost:4000/getNotes')
          .then((res) => res.json())
          .then((jsonRes) => {
            if(jsonRes.length>0){
              changeNotes(jsonRes)
              var max_id=0;
              for(var i=0;i<jsonRes.length;i++){
                if(jsonRes[i].note_id>max_id){
                  max_id=jsonRes[i].note_id;
                }
              }
              // The first new note will have an ID one more than the max id of previous notes.
              change_note_id(max_id+1);
            }
          })
      }
    }, [])


  return (
    <div>
      <Header />
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
