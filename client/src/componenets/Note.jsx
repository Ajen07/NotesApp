import React from "react";
import { Link } from "react-router-dom";
import main from "../assets/images/notesImage.svg";
import { useAppContext } from "../Context/appContext";

const Note = ({ _id, title, createdAt }) => {
  const { deleteNote, setEditNote, isLoading } = useAppContext();
  return (
    <div className="note">
      <img src={main} alt="Notes Hero Image" className="note-image" />
      <h2 className="title">{title}</h2>
      <p className="createdat">{createdAt.split("T")[0]}</p>
      <div className="btn-container">
        <Link className="note-btn read">Read</Link>
        <Link
          to="add-note"
          onClick={() => {
            setEditNote(_id);
          }}
          className="note-btn edit"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => {
            deleteNote(_id);
          }}
          disabled={isLoading}
          className="note-btn delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Note;
