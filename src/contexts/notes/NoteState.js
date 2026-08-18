import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  // Works on Vercel when frontend and API are deployed together
  const host =
    process.env.REACT_APP_API_URL || "";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const json = await response.json();
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          description,
          tag,
        }),
      }
    );

    const note = await response.json();

    setNotes((prevNotes) => prevNotes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    // Consume response without creating an unused variable
    await response.json();

    setNotes((prevNotes) =>
      prevNotes.filter((note) => note._id !== id)
    );
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          description,
          tag,
        }),
      }
    );

    // Consume response
    await response.json();

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === id
          ? {
              ...note,
              title,
              description,
              tag,
            }
          : note
      )
    );
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;