import React, { useState } from "react";
import Header from "../components/Header";
import RowButton from "../components/RowButton";
import ColButton from "../components/ColButton";
import Table from "../components/Table";

const FakeSheet = (props) => {
  const [RowNum, setRowNum] = useState(101);
  const [ColNum, setColNum] = useState(27);
  const [selected, setSelected] = useState(-1);

  var initialData = [];

  const getAlphabet = (id) => {
    if (id <= 26) {
      return String.fromCharCode(id + 64);
    } else {
      return (
        String.fromCharCode(Math.floor((id - 1) / 26) + 64) +
        String.fromCharCode(((id - 1) % 26) + 65)
      );
    }
  };
  const getAlphaList = (id) => {
    var AlphaList = [""];
    for (var i = 1; i <= id; i++) {
      AlphaList.push(getAlphabet(i));
    }
    return AlphaList;
  };

  initialData.push(getAlphaList(ColNum - 1));

  const getEmptyList = (id) => {
    const EmptyList = [];
    for (i = 0; i < id; i++) {
      EmptyList.push("");
    }
    return EmptyList;
  };
  const empty26 = getEmptyList(26);
  for (var i = 1; i < RowNum; i = i + 1) {
    initialData[i] = [i];
    initialData[i].push.apply(initialData[i], empty26);
  }

  const [data, setData] = useState(initialData);

  var [Rid, Cid] = [RowNum, ColNum];
  const getUpdated = () => {
    if (selected !== -1) {
      //console.log("selected:", selected);
      Rid = Math.floor(selected / ColNum);
      Cid = selected % ColNum;
    }
    console.log("rid", Rid, "; cid", Cid);
  };

  //arr.splice(start, num_of_deletion, insert_item);
  const insertRow = () => {
    console.log("== insert row ==");
    getUpdated();
    const updatedData = data.slice();
    let [newNum, newRow] = [RowNum + 1, [Rid]];
    setRowNum(newNum);

    newRow.push.apply(newRow, getEmptyList(ColNum - 1));
    updatedData.splice(Rid, 0, newRow);
    for (var i = Rid + 1; i < newNum; i++) {
      updatedData[i][0] += 1;
    }
    setData(updatedData);
    if (ColNum < selected && selected < ColNum * newNum) {
      // still in valid table cell
      console.log("return focus to", selected);
      document.getElementById(selected).focus();
    }
  };

  const deleteRow = () => {
    console.log("== delete row ==");
    if (selected !== -1) {
      getUpdated();
      let newNum = RowNum - 1;
      setRowNum(newNum);

      const updatedData = data.slice();
      updatedData.splice(Rid, 1);
      for (var i = Rid; i < newNum; i++) {
        updatedData[i][0] -= 1;
      }
      setData(updatedData);
      console.log('selected',selected);
      console.log(ColNum*newNum);
      if (ColNum < selected && selected < ColNum * newNum) {
        // still in valid table cell
        console.log("return focus to", selected);
        document.getElementById(selected).focus();
      } else {
        // Arrowup
        //if (props.rid !== 1) {
        if (Math.floor(selected / ColNum) !== 1) {
          // not to 1st row
          var newActive = selected - ColNum;
          console.log(selected,newActive)
          document.getElementById(newActive).focus();
          setSelected(newActive);
        }
      }
    }
  };

  const insertCol = () => {
    console.log("== insert col ==");
    getUpdated();
    //var [Orid, Ocid] = [Math.floor(selected / ColNum), selected % ColNum];
    var [newNum, updatedData] = [ColNum + 1, data.slice()];
    updatedData[0] = getAlphaList(newNum - 1);
    setColNum(newNum);

    for (i = 1; i < RowNum; i++) {
      updatedData[i].splice(Cid, 0, "");
    }
    setData(updatedData);

    // newly selected
    if (selected !== -1) {
      var newSelected = Rid * newNum + Cid;
      console.log("active element", document.activeElement);
      //console.log("return focus to", newSelected);
      setSelected(newSelected);
      document.getElementById(newSelected).focus();

      console.log("active element", document.activeElement);
    }
  };

  const deleteCol = () => {
    console.log("== delete col ==");
    if (selected !== -1) {
      getUpdated();
      var [Orid, Ocid] = [Math.floor(selected / ColNum), selected % ColNum];
      var [newNum, updatedData] = [ColNum - 1, data.slice()];
      updatedData[0] = getAlphaList(newNum - 1);

      for (i = 1; i < RowNum; i++) {
        updatedData[i].splice(Cid, 1);
      }
      setData(updatedData);
      console.log("row:",Orid, RowNum,"col:", Ocid, newNum);
      console.log("selected", selected)
      if (Ocid < newNum) {
        // still in valid table cell
        // newly selected
        var newSelected = Orid * newNum + Ocid;
        //console.log("return focus to", newSelected);
        document.getElementById(newSelected).focus();
        setSelected(newSelected);
      } else {
        // Arrowleft
        if (selected % ColNum !== 1) {
          // not to 1st col
          newSelected = selected - 1;
          console.log(selected,newSelected)
          document.getElementById(newSelected).focus();
          setSelected(newSelected);
        }
      }
      setColNum(newNum);
    }
  };
  //
  return (
    <div className="all">
      <Header />
      <div className="up">
        <ColButton
          selected={selected}
          ColNum={ColNum}
          insertCol={insertCol}
          deleteCol={deleteCol}
        />
      </div>
      <div className="down">
        <RowButton
          selected={selected}
          RowNum={RowNum}
          ColNum={ColNum}
          insertRow={insertRow}
          deleteRow={deleteRow}
        />
        <Table
          data={data}
          setData={setData}
          RowNum={RowNum}
          ColNum={ColNum}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};

export default FakeSheet;
