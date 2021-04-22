import React, { useState } from "react";

export default function Cell(props) {
  const [display, setDisplay] = useState("");
  const [editable, setEditable] = useState(false);

  const onBlurInput = () => {
    const updatedData = props.data.slice(); //copy
    updatedData[props.rid][props.cid] = display;
    props.setData(updatedData);
    setEditable(false);
    //console.log("[input] on blur called");
  };

  const KeyDownHandler = (e) => {
    const updatedData = props.data.slice(); //copy
    //console.log(e.key);
    if (e.key === "Alt") {
      e.preventDefault();
    }
    var neglects = [
      "Alt",
      "Backspace",
      "Delete",
      "Control",
      "Shift",
      "Tab",
      "CapsLock",
      "Meta",
    ];
    var direction = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    if (editable === false) {
      if (
        !neglects.includes(e.key) &&
        !direction.includes(e.key) &&
        props.cid !== 0 &&
        props.rid !== 0
      ) {
        //press a valid char on focused cell
        setEditable(true);
        if (e.key !== "Enter") {
          setDisplay("");
        }
      } else if (direction.includes(e.key)) {
        e.preventDefault();
        // set focus
        if (e.key === "ArrowUp") {
          if (props.rid !== 1) {
            // not to 1st row
            var newActive = props.uid - props.ColNum;
            document.getElementById(newActive).focus();
          }
        } else if (e.key === "ArrowDown") {
          if (props.rid + 1 !== props.RowNum) {
            // not at last row
            newActive = props.uid + props.ColNum;
            document.getElementById(newActive).focus();
          }
        } else if (e.key === "ArrowLeft") {
          if (props.cid !== 1) {
            newActive = props.uid - 1;
            document.getElementById(newActive).focus();
          }
        } else if (e.key === "ArrowRight") {
          if (props.cid + 1 !== props.ColNum) {
            // not at last col
            newActive = props.uid + 1;
            document.getElementById(newActive).focus();
          }
        }
      } else if (e.key === "Backspace" || e.key === "Delete") {
        //console.log("empty this cell");
        updatedData[props.rid][props.cid] = "";
        props.setData(updatedData);
      }
    } else {
      //editable === true
      if (e.key === "Enter") {
        // finish typing
        onBlurInput(); // save data
        if (props.rid + 1 !== props.RowNum) {
          // not at last row
          newActive = props.uid + props.ColNum;
          document.getElementById(newActive).focus();
        } else {
          document.getElementById(props.uid).focus();
        }
      }
    }
  };
  const onFocus = () => {
    console.log("on Focus", props.rid, props.cid);
    props.setSelected(parseInt(document.activeElement.id));
  };

  const DisplayHandler = (e) => {
    setDisplay(e.target.value);
    //console.log("display", display);
  };

  const onDoubleClick = () => {
    //console.log("double click, with display", display);
    if (props.cid !== 0 && props.rid !== 0) {
      setEditable(true);
    }
  };

  var content = editable ? (
    <input
      autoFocus={true}
      onChange={DisplayHandler}
      value={display}
      onBlur={onBlurInput}
      id={parseInt(props.uid)}
    />
  ) : (
    <div>{props.name}</div>
  );

  //var ClassName = props.cid === 0 ? "index" : "";

  var ClassName = "";
  if (props.cid === 0) {
    // 1st column
    ClassName = "index";
    if (Math.floor(props.selected / props.ColNum) === props.rid) {
      ClassName = "index active";
    }
  } else if (props.rid === 0) {
    // 1st row
    if (props.selected % props.ColNum === props.cid) {
      ClassName = "active";
    }
  } else if (props.uid === props.selected) {
    ClassName = "selected";
  }

  if (props.rid === 0) {
    //first row
    return (
      <td tabIndex={0} className={ClassName}>
        <span>{props.name}</span>
      </td>
    );
  } else {
    return (
      <td
        tabIndex={0}
        key={props.uid}
        id={parseInt(props.uid)}
        //rid={props.rid}
        //cid={props.cid}
        className={ClassName}
        onDoubleClick={onDoubleClick}
        onFocus={onFocus}
        onKeyDown={KeyDownHandler}
      >
        {content}
      </td>
    );
  }
}
