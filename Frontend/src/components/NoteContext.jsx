import React from "react"
import axios from 'axios'
const NotesContext = React.createContext();

export function useNotes(){
    return React.useContext(NotesContext);
}

export const NotesProvider = ({children}) =>{
    
    const [notes, changeNotes] = React.useState([]);
    const [note_id,change_note_id] = React.useState(0);
    const [signup, changeSignUp] = React.useState(true);
    
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
    
    async function addToNotes(t,c,id) {
        if(localStorage.getItem("jwt")){
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
            console.log("Adding to Notes")
            const note = {
                note_id:id,
                title:t,
                content:c
            };
            const response = await axios.post("http://localhost:4000/postNote" , {note},{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem("jwt")
                }
            })
            console.log(response)

        }
    }
    
    function deleteNote(id) {
        changeNotes((prevItems) => {
            return prevItems.filter((item, index) => {
            return (item.note_id) !== id;
            });
        });
        deleteANote(id);
    }

    return (
        <NotesContext.Provider value={{
            note_id,
            notes,
            deleteANote,
            addToNotes,
            deleteNote,
            signup,
            changeNotes,
            change_note_id,
            changeSignUp,
        }}>
            {children}
        </NotesContext.Provider>
    );
}