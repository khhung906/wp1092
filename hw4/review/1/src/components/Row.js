import React from "react";
import Cell from "../components/Cell";

export default function Row(props) {
  var cellList = [];

  for (var i = 0; i < props.ColNum; i++) {
    //var uid = props.row_id * props.ColNum + i;
    cellList.push(
      <Cell
        name={props.data[props.row_id][i]}
        data={props.data}
        rid={props.row_id}
        cid={i}
        uid={props.row_id * props.ColNum + i}
        setData={props.setData}
        ColNum={props.ColNum}
        RowNum={props.RowNum}
        selected={props.selected}
        setSelected={props.setSelected}
      />
    );
  }

  return <tr>{cellList}</tr>;
}
