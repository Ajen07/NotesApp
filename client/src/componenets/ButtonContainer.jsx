import React from "react";
import { useAppContext } from "../Context/appContext";

const ButtonContainer = () => {
  const { numofPages, changePage ,page} = useAppContext();

  const pages = Array.from({ length: numofPages }, (_, index) => index + 1);

  return (
    <div className="page-btn-container">
      {pages.map((pageNumber) => {
        return (
          <button
            type="button"
            className={pageNumber === page ? "pageBtn activePage" : "pageBtn"}
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonContainer;
