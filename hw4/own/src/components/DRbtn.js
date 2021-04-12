import React from "react";


function DRbtn({delete_row}){
    return(<button className="button1" onClick={delete_row} style={{marginLeft: "100px", marginTop: "0px"}}>-</button>);
}



export default DRbtn;