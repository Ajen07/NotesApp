import React from "react";
import FormRow from "../../componenets/FormRow";
import Alert from "../../componenets/Alert";
import { useAppContext } from "../../Context/appContext";
import FormTextArea from "../../componenets/FormTextArea";

const AddNotes = () => {
  const {
    title,
    body,
    handleChange,
    isEdit,
    showAlert,
    displayAlert,
    createNote,
    editNote,
    isLoading,
  } = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      displayAlert();
      return;
    }
    if (isEdit) {
      editNote({ title, body });
    } else {
      createNote({ title, body });
    }
  };
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  return (
    <form className="form addnote">
      {showAlert && <Alert />}
      <FormRow
        type="text"
        name="title"
        labelText="TITLE OF THE NOTE"
        value={title}
        handleChange={handleInputChange}
      />
      <FormTextArea
        name="body"
        labelText="DESCRIPTION OF NOTE"
        value={body}
        handleChange={handleInputChange}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="btn"
        onClick={handleSubmit}
      >
        {isEdit ? "Save Changes" : "Save"}
      </button>
    </form>
  );
};

export default AddNotes;
