import React, { useEffect } from "react";
import { useAppContext } from "../Context/appContext";
import Note from "./Note";
import ButtonContainer from "./ButtonContainer";

const NotesContainer = () => {
  const {
    notes,
    isLoading,
    totalNotes,
    numofPages,
    page,
    getAllNotes,
  } = useAppContext();
  useEffect(() => {
    getAllNotes();
  }, [page]);
  if (isLoading) {
    return (
      <h4 style={{ color: "blue", textAlign: "center", fontSize: "2rem" }}>
        Loading ....
      </h4>
    );
  }
  if (totalNotes === 0) {
    return (
      <h5
        style={{
          padding: "1rem",
          color: "blue",
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        No Notes to display
      </h5>
    );
  }
  return (
    <>
      <div className="notes-container">
        {notes.map((note) => {
          return <Note key={note._id} {...note} />;
        })}
      </div>
      {numofPages > 1 && <ButtonContainer />}
    </>
  );
};

export default NotesContainer;
