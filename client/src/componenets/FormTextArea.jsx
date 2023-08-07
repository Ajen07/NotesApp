import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FormTextArea = ({ name, value, handleChange, labelText }) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <textarea
        className="form-text-area"
        name={name}
        value={value}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default FormTextArea;
