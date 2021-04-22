import React, { useState , useRef, useEffect} from "react";
import Header from "../components/Header";
import Button from "../components/addButton"

function FakeSheet(){
    const [row, setRow] = useState(101);
    const [col, setCol] = useState(26);
    //initial the sheet
    let alphabetarray = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK"];
    let list = Array(row).fill("  ").map(e => new Array(col+1).fill(" "));
    for (let i = 0; i <= col; i++) { list[0][i] = alphabetarray[i]; }
    for (let j = 1; j <= row-1; j++) { list[j][0] = j; }
    const [lists, setLists] = useState(list); 
    const [currentRow, setCurrentRow] = useState(-1); 
    const [currentCol, setCurrentCol] = useState(-1);
    const [in_put, setIn_put] = useState(""); 
    // const [mode, setMode] = useState(0); //click:0 dbclick:1
 
    function addRow() {
        let temp = new Array(col+1).fill("  ");
        let new_list = [...lists];
        console.log(lists);
        new_list.splice(currentRow,0,temp);
        cleantext();
        console.log(new_list);
        for (let i = currentRow; i <= row; i++) {
            new_list[i][0] = i;
        }
        setRow(row+1);
        setLists(new_list);
        console.log(lists);
    }

    function deleteRow() {
        let new_list = [...lists];
        new_list.splice(currentRow,1);
        for (let i = currentRow; i <= row-2; i++) {
            new_list[i][0] = i;
        }
        cleantext();
        setRow(row-1);
        setLists(new_list);
    }



    function addtext(e) {
        // console.log(currentRow, currentCol);
        // if (e.charCode === 13) {

        // }
        // if (mode === 0) {
        //     e.target.value="";
        //     setMode(1);
        // }
        console.log(e.target.value);
        console.log(e);
        let new_list = [...lists];
        new_list[currentRow][currentCol] = e.target.value;
        // console.log(list[currentRow][currentCol]);
        setLists(new_list);
        console.log(lists);
    }
    function cleantext() {
        // let new_input = in_put;
        // if (new_input.target.value === null) {
        //     return;
        // }
        // else {
        //     new_input.target.value = "";
        // }
        // setIn_put(in_put);
        // console.log(new_input);
        // in_put.target.value="2";
        // console.log(in_put.target.value);
        // new_input.target.value = "";
        // setIn_put(in_put);
    }

    // function addCol() {
    //     let new_list = lists.map(e => {e.splice(currentCol, 1)});
    //     let new_input = in_put;
    //     setLists(new_list);
    //     setCol(row-1);
    // }

    // function deleteCol() {
    //     setCol(col-1);
    //     setLists(genSheet());
    // }

    function currentrowcol(rindex, cindex) {
        setCurrentRow(rindex);
        setCurrentCol(cindex);
        setLists(lists);
    }

    function changeinput(e) {
        cleantext();
        setIn_put(e);
        console.log(e);
    }

    function background(rindex, cindex, i) {
        if (cindex === 0 || rindex === 0) {
            return i;
        }
        else {
            return <input type={"text"} style={backgroundstyle(rindex, cindex) ,{width : "100%"}, {height : "100%"}} onKeyUp={addtext}  onClick={changeinput}  placeholder={i} ></input>
        }
    }

    function backgroundstyle(rindex, cindex) {
        if (rindex === currentRow && cindex === currentCol) {
            console.log("aaaa");
            return {border: '3px solid green'}
        }
        if ((rindex === currentRow && cindex === 0) || (cindex === currentCol && rindex === 0)) {
            if (currentRow === 0 || currentCol === 0) {
                return {backgroundColor : "gray"}
            }
            return {backgroundColor : "green"}
        } 
        if (rindex === 0 || cindex === 0) {
            return {backgroundColor : "gray"}
        }
        else return;
    }

    function Table() {
        return (
            <>  
                <table>
                    {lists.map((e, rindex) => <tr>{e.map((i, cindex) => <td style={backgroundstyle(rindex, cindex)} onMouseDown={() => currentrowcol(rindex, cindex)} >{background(rindex, cindex, i)}</td>)}</tr>)}
                </table>
            </>
        )
    }

    return (
        <>
            <Button onClick={addRow}>+</Button>
            <Button onClick={deleteRow}>-</Button>
            {/* <Button onClick={addCol}>+</Button> */}
            {/* <Button onClick={deleteCol}>-</Button>  */}
            {Table()}
        </>
    )
}


export default FakeSheet;

/*
[
[{data : 1, tag : 0},{data: 2, tag : 0},3],
[4,5,6],
[7,8,9]
]
*/