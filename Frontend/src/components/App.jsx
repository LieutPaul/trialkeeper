import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import axios from 'axios'
import CreateArea from "./CreateArea";
import { useNotes } from "./NoteContext";


function App() {

  const {notes,change_note_id,changeNotes,signup,addToNotes,note_id,deleteNote,changeSignUp} = useNotes();

    const getNotes = async () =>{
      const response = await axios.get("http://localhost:4000/getNotes");
      // console.log(response.data);
      return (response.data);
    }

    React.useEffect(()=>{
      const obj = getNotes();
      obj.then((result)=>{
        console.log(result);
      })
      // console.log(obj.data)
          // if(jsonRes.length>0){
          //   changeNotes(jsonRes)
          //   var max_id=0;
          //   for(var i=0;i<jsonRes.length;i++){
          //     if(jsonRes[i].note_id>max_id){
          //       max_id=jsonRes[i].note_id;
          //     }
          //   }
          //   // The first new note will have an ID one more than the max id of previous notes.
          //   change_note_id(max_id+1);
          // }
    })


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
