import React, { useState } from "react";
import { useAppContext } from "../../Context/appContext";
import NotesContainer from "../../componenets/NotesContainer";
import Alert from "../../componenets/Alert";
import searchbar from "../../assets/logos/searchbar.png";
import ButtonContainer from "../../componenets/ButtonContainer";

const AllNotes = () => {
  const { showAlert, isLoading, search, handleChange, getAllNotes,numofPages } =
    useAppContext();

  const handleSearch = (e) => {
    if (isLoading) {
      return;
    }
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getAllNotes();
  };

  return (
    <>
      <div className="search-bar">
        {showAlert && <Alert />}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            name="search"
            value={search}
            onChange={handleSearch}
          />
          <button type="submit" className="search-btn">
            <img src={searchbar} alt="searchbar" />
          </button>
        </form>
      </div>
      <NotesContainer />
     
    </>
  );
};

export default AllNotes;
