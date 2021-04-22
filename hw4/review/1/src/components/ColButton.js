import React from "react";

function ColButton(props) {
  return (
    <>
      <button type="button" onClick={() => props.insertCol()}>
        <span className="button-text"> + </span>
      </button>

      <button type="button" onClick={() => props.deleteCol()}>
        <span className="button-text"> - </span>
      </button>
    </>
  );
}

export default ColButton;
