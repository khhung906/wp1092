import React from "react";
import Row from "../components/Row";

const Table = (props) => {
  //var initialData = props.data;

  var index = [
    <Row
      row_id={0}
      data={props.data}
      ColNum={props.ColNum}
      selected={props.selected}
    />,
  ];

  var rowList = [];
  for (var i = 1; i < props.RowNum; i = i + 1) {
    rowList.push(
      <Row
        row_id={i}
        data={props.data}
        setData={props.setData}
        RowNum={props.RowNum}
        ColNum={props.ColNum}
        selected={props.selected}
        setSelected={props.setSelected}
      />
    );
  }
  return (
    <table>
      <thead>{index}</thead>
      <tbody>{rowList}</tbody>
    </table>
  );
};

export default Table;
