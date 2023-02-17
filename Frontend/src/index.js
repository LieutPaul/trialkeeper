import React from "react";
import ReactDOM from "react-dom/client";
import App2 from "./components/App2.jsx";
import { NotesProvider } from "./components/NoteContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NotesProvider>
      <App2 />
    </NotesProvider>
  </React.StrictMode>
);


