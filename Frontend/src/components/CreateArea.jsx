import React from "react";
import { Alert } from "react-alert";

function CreateArea(props) {
  const [title, changeTitle] = React.useState("");
  const [content, changeContent] = React.useState("");
  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={(event) => {
            changeTitle(event.target.value);
          }}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          value={content}
          rows="3"
          onChange={(event) => {
            changeContent(event.target.value);
          }}
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            if (content === "" || title === "") {
              alert("Do not leave content or title empty");
            } else {
              changeContent("");
              changeTitle("");
              props.onSubmit(title, content);
            }
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
