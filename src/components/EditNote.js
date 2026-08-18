import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import noteContext from "../contexts/notes/noteContext";

const EditNote = (props) => {
  const context = useContext(noteContext);
  const { editNote } = context;

  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  useEffect(() => {
    if (props.currentNote) {
      setNote({
        id: props.currentNote._id,
        title: props.currentNote.title,
        description: props.currentNote.description,
        tag: props.currentNote.tag,
      });
    }
  }, [props.currentNote]);

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await editNote(
      note.id,
      note.title,
      note.description,
      note.tag
    );

    props.showAlert(
      "Updated Successfully",
      "success"
    );

    props.closeEditNote();
  };

  if (!props.show) {
    return null;
  }

  return (
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
              Edit Note
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={props.closeEditNote}
            ></button>
          </div>

          <div className="modal-body">

            <form onSubmit={handleUpdate}>

              <div className="mb-3">
                <label
                  htmlFor="editTitle"
                  className="form-label"
                >
                  Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="editTitle"
                  name="title"
                  value={note.title}
                  onChange={onChange}
                  minLength={5}
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="editDescription"
                  className="form-label"
                >
                  Description
                </label>

                <textarea
                  className="form-control"
                  id="editDescription"
                  name="description"
                  value={note.description}
                  onChange={onChange}
                  minLength={5}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="editTag"
                  className="form-label"
                >
                  Tag
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="editTag"
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
                 Update Note
               </button>
             </div>
            </form>

          </div>      
        </div>
      </div>
    </div>
  );
};

export default EditNote;