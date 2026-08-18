// import React, {useContext, useState} from 'react'
// import noteContext from "../contexts/notes/noteContext"

// const AddNote = (props) => {
//     const context = useContext(noteContext);
//     const {addNote} = context;

//     const [note, setNote] = useState({title: "", description: "", tag: ""})

//     const handleClick = (e)=>{
//         e.preventDefault();
//         addNote(note.title, note.description, note.tag);
//         setNote({ id: "", title: "", description: "", tag: "" });
//         props.showAlert("Added Successfully", "success");

//     }

//     const onChange = (e)=>{
//         setNote({...note, [e.target.name]: e.target.value})
//     }
//     return (
//         <div className="container my-3">
//             <h2>Add a Note</h2>
//             <form className="my-3" onSubmit={handleClick}>
//                 <div className="mb-3">
//                     <label htmlFor="title" className="form-label">Title</label>
//                     <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"  value={note.title} onChange={onChange} minLength={5} required/> 
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="description" className="form-label">Description</label>
//                     <input type="text" className="form-control" id="description" name="description" value={note.description}  onChange={onChange} minLength={5} required/>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="tag" className="form-label">Tag</label>
//                     <input type="text" className="form-control" id="tag" name="tag" value={note.tag}  onChange={onChange} />
//                 </div>
//                 <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
//             </form>
//         </div>
//     )
// }

// export default AddNote

import React, { useContext, useState } from "react";
import noteContext from "../contexts/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();

    await addNote(
      note.title,
      note.description,
      note.tag
    );

    setNote({
      title: "",
      description: "",
      tag: "",
    });

    props.showAlert("Added Successfully", "success");

    props.closeAddNote();
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Add Note Modal */}
      {props.show && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  Add a New Note
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={props.closeAddNote}
                ></button>
              </div>

              <div className="modal-body">

                <form onSubmit={handleClick}>

                  <div className="mb-3">
                    <label
                      htmlFor="title"
                      className="form-label"
                    >
                      Title
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={note.title}
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="description"
                      className="form-label"
                    >
                      Description
                    </label>

                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={note.description}
                      onChange={onChange}
                      minLength={5}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="tag"
                      className="form-label"
                    >
                      Tag
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="tag"
                      name="tag"
                      value={note.tag}
                      onChange={onChange}
                    />
                  </div>

                  <div className="modal-footer">
               <button
                 type="button"
                 className="btn btn-secondary"
                onClick={props.closeEditNote}
               >
                 Close
               </button>
               <button
                 disabled={
                  note.title.length < 5 || note.description.length < 5
                 }
                 
                 type="submit"
                 className="btn btn-primary"
               >
                 Add Note
               </button>
             </div>

                </form>

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNote;