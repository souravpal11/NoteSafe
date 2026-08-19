// import React, { useContext, useEffect, useRef, useState } from "react";
// import noteContext from "../contexts/notes/noteContext";
// import Noteitem from "./Noteitem";
// import AddNote from "./AddNote";

// const Notes = (props) => {
//   const context = useContext(noteContext);
//   const { notes, getNotes, editNote } = context;
//   useEffect(() => {
//     getNotes();
//     // eslint-disable-next-line
//   }, []);
//   const ref = useRef(null);
//   const refClose = useRef(null);
//   const [note, setNote] = useState({
//     id: "",
//     etitle: "",
//     edescription: "",
//     etag: "",
//   });

//   const updateNote = (currentNote) => {
//     ref.current.click();
//     setNote({
//       id: currentNote._id,
//       etitle: currentNote.title,
//       edescription: currentNote.description,
//       etag: currentNote.tag,
//     });
//   };

//   const handleClick = (e) => {
//     editNote(note.id, note.etitle, note.edescription, note.etag);
//     refClose.current.click();
//     setNote({ id: "", etitle: "", edescription: "", etag: "" });
//     props.showAlert("Updated Successfully", "success");
//   };

//   const onChange = (e) => {
//     setNote({ ...note, [e.target.name]: e.target.value });
//   };

//   return (
//     <>
//       <AddNote showAlert={props.showAlert} />
//       <button
//         ref={ref}
//         type="button"
//         className="btn btn-primary d-none"
//         data-bs-toggle="modal"
//         data-bs-target="#exampleModal"
//       >
//         Launch demo modal
//       </button>
//       <div
//         className="modal fade"
//         id="exampleModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLabel">
//                 Edit Note
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form className="my-3">
//                 <div className="mb-3">
//                   <label htmlFor="title" className="form-label">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="etitle"
//                     name="etitle"
//                     value={note.etitle}
//                     aria-describedby="emailHelp"
//                     onChange={onChange}
//                     minLength={5}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="description" className="form-label">
//                     Description
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="edescription"
//                     name="edescription"
//                     value={note.edescription}
//                     onChange={onChange}
//                     minLength={5}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="tag" className="form-label">
//                     Tag
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="etag"
//                     name="etag"
//                     value={note.etag}
//                     onChange={onChange}
//                   />
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button
//                 ref={refClose}
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button
//                 disabled={
//                   note.etitle.length < 5 || note.edescription.length < 5
//                 }
//                 onClick={handleClick}
//                 type="button"
//                 className="btn btn-primary"
//               >
//                 Update Note
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row my-3">
//         <h2>Your Notes</h2>
//         <div className="row">
//           {notes.map((note) => {
//             return (
//               <Noteitem key={note._id} updateNote={updateNote} note={note} />
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Notes;

// import React, {
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import noteContext from "../contexts/notes/noteContext";
// import Noteitem from "./Noteitem";
// import AddNote from "./AddNote";
// import EditNote from "./EditNote";
// import Lottie from "lottie-react";
// import empty from "../empty.json";

// const Notes = (props) => {
//   const context = useContext(noteContext);

//   const { notes, getNotes } = context;

//   const [showAddNote, setShowAddNote] = useState(false);
//   const [showEditNote, setShowEditNote] = useState(false);

//   const [currentNote, setCurrentNote] = useState(null);

//   useEffect(() => {
//     getNotes();

//     // eslint-disable-next-line
//   }, []);

//   // Open Add Note
//   const openAddNote = () => {
//     setShowAddNote(true);
//   };

//   // Close Add Note
//   const closeAddNote = () => {
//     setShowAddNote(false);
//   };

//   // Open Edit Note
//   const updateNote = (note) => {
//     setCurrentNote(note);
//     setShowEditNote(true);
//   };

//   // Close Edit Note
//   const closeEditNote = () => {
//     setShowEditNote(false);
//     setCurrentNote(null);
//   };

//   return (
//     <>
//       {/* Add Note */}
//       <AddNote
//         show={showAddNote}
//         closeAddNote={closeAddNote}
//         showAlert={props.showAlert}
//       />

//       {/* Edit Note */}
//       <EditNote
//         show={showEditNote}
//         currentNote={currentNote}
//         closeEditNote={closeEditNote}
//         showAlert={props.showAlert}
//       />

//       <div className="container my-3">

//         <div className="d-flex justify-content-between align-items-center mb-4">

//           <h2>Your Notes</h2>

//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={openAddNote}
//           >
//             <i className="fa-solid fa-plus"></i>{" "}
//             Add New Note
//           </button>

//         </div>

//         {notes.length === 0 && (
//           <Lottie
//         animationData={empty}
//         style={{
//           width: 220,

//           height: 220,

//           margin: "auto",
//         }}
//       />
//         )}

//         <div className="row">

//           {notes.map((note) => {
//             return (
//               <Noteitem
//                 key={note._id}
//                 updateNote={updateNote}
//                 note={note}
//               />
//             );
//           })}

//         </div>

//       </div>
//     </>
//   );
// };

// export default Notes;

import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import noteContext from "../contexts/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import EditNote from "./EditNote";

const Notes = (props) => {
  const context = useContext(noteContext);

  const { notes, getNotes } = context;

  const [showAddNote, setShowAddNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);

  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    getNotes();

    // eslint-disable-next-line
  }, []);

  // Open Add Note
  const openAddNote = () => {
    setShowAddNote(true);
  };

  // Close Add Note
  const closeAddNote = () => {
    setShowAddNote(false);
  };

  // Open Edit Note
  const updateNote = (note) => {
    setCurrentNote(note);
    setShowEditNote(true);
  };

  // Close Edit Note
  const closeEditNote = () => {
    setShowEditNote(false);
    setCurrentNote(null);
  };

  return (
    <>
      {/* Add Note */}
      <AddNote
        show={showAddNote}
        closeAddNote={closeAddNote}
        showAlert={props.showAlert}
      />

      {/* Edit Note */}
      <EditNote
        show={showEditNote}
        currentNote={currentNote}
        closeEditNote={closeEditNote}
        showAlert={props.showAlert}
      />

      <div className="container my-3">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2>Your Notes</h2>

          <button
            type="button"
            className="btn btn-primary"
            onClick={openAddNote}
          >
            <i className="fa-solid fa-plus"></i>{" "}
            Add New Note
          </button>

        </div>

        {/* Empty Notes */}
        {notes.length === 0 ? (
  <div className="text-center mt-5">

    <div className="empty-notes-icon bg-dark">
      <i className="fa-regular fa-note-sticky"></i>
    </div>

    <h4 className="mt-3 text-light">
      No notes yet
    </h4>

    <p className="text-muted text-light">
      Click "Add New Note" to create your first note.
    </p>

  </div>

        ) : (

          /* Notes */
          <div className="row">

            {notes.map((note) => {
              return (
                <Noteitem
                  key={note._id}
                  updateNote={updateNote}
                  note={note}
                />
              );
            })}

          </div>

        )}

      </div>
    </>
  );
};

export default Notes;