import React from "react";

function RowButton(props) {
  return (
    <div className="rowbutton">
      <button
        type="button"
        onClick={() => {
          props.insertRow();
        }}
      >
        <span className="button-text"> + </span>
      </button>

      <button
        type="button"
        onClick={() => {
          props.deleteRow();
        }}
      >
        <span className="button-text"> - </span>
      </button>
    </div>
  );
}

export default RowButton;
