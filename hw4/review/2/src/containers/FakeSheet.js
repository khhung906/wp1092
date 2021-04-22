import React, { useState , useRef, useEffect} from "react";
import Header from "../components/Header";
import Button from "../components/addButton"
import {Keyboard} from 'react'
function FakeSheet(){
    const [row, setRow] = useState(101);
    const [col, setCol] = useState(26);
    //initial the sheet
    let alphabetarray = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK"];
    let list = Array(row).fill(" ").map(e => new Array(col+1).fill(" ").map(e => new Array("", 0, 0))); //context, have target value or not, 
    // console.log(list);
    for (let i = 0; i <= col; i++) { list[0][i][0] = alphabetarray[i]; }
    for (let j = 1; j <= row-1; j++) { list[j][0][0] = j; } 
    const [lists, setLists] = useState(list); 
    const [currentRow, setCurrentRow] = useState(-1); 
    const [currentCol, setCurrentCol] = useState(-1);
    const [in_put, setIn_put] = useState(""); 
    // const [mode, setMode] = useState(0); //click:0 dbclick:1
    useEffect(() => {
            setLists(lists);
        }
    ) 

    function addRow() {
        if (currentRow === -1 || currentCol === -1) {
            let temp1 = new Array(col+1).fill(" ").map(e => new Array("", 0, 0));
            let new_list1 = [...lists];
            new_list1.splice(row,0,[...temp1]);
            for (let i = 1; i <= row; i++) {
                new_list1[i][0][0] = i;
            }
            setRow(row+1);
            setLists(new_list1);
            return;
        }
        let temp = new Array(col+1).fill(" ").map(e => new Array("", 0, 0));
        let new_list = [...lists];
        console.log(lists);
        new_list.splice(currentRow,0,[...temp]);
        cleantext(currentRow, currentCol);
        console.log(new_list);
        for (let i = currentRow; i <= row; i++) {
            new_list[i][0][0] = i;
        }
        setRow(row+1);
        setLists(new_list);
        console.log(lists);
    }

    function addCol() {
        if (currentRow === -1 || currentCol === -1) {
            let temp1 = new Array("", 0, 0);
            let new_list1 = [...lists];
            for (let i = 0; i <= row-1; i++) {
                new_list1[i].splice(col+1, 0, [...temp1]);
            }
            new_list1[0][col+1][0] = alphabetarray[col+1];
            setCol(col+1);
            setLists(new_list1);
            return;
        }
        let temp = new Array("", 0, 0);
        let new_list = [...lists];
        cleantext(currentRow, currentCol);
        for (let i = 1; i <= row-1; i++) {
            new_list[i].splice(currentCol, 0, [...temp]);
        }
        new_list[0].splice(col+1, 0, [...temp]);
        new_list[0][col+1][0] = alphabetarray[col+1];
        setCol(col+1);
        setLists(new_list);
    }

    function deleteRow() {
        if (currentRow === -1 || currentCol === -1) {
            let new_list1 = [...lists];
            new_list1.splice(row-1, 1);
            setRow(row-1);
            setLists(new_list1);
            return;
        }
        let new_list = [...lists];
        new_list.splice(currentRow,1);
        for (let i = currentRow; i <= row-2; i++) {
            new_list[i][0][0] = i;
        }
        cleantext(currentRow, currentCol);
        setRow(row-1);
        setLists(new_list);
    }

    function deleteCol() {
        if (currentRow === -1 || currentCol === -1) {
            let new_list1 = [...lists];
            for (let i = 0; i <= row-1; i++) {
                new_list1[i].splice(col,1);
            }
            setCol(col-1);
            setLists(new_list1);
            return;
        }
        let new_list = [...lists];
        cleantext(currentRow, currentCol);
        for (let i = 1; i <= row-1; i++) {
            new_list[i].splice(currentCol, 1);
        }
        new_list[0].splice(col, 1);
        setCol(col-1);
        setLists(new_list);
    }

    function tonum(pos) {
        let i = 0;
        while (i < pos.length && isNaN(pos[i])) { i++; }
        console.log(i);
        let pos1 = pos.substring(0, i);
        let pos2 = pos.substring(i, pos.length);
        let r = alphabetarray.indexOf(pos1);
        let c = Number(pos2);
        return [r, c];
    }
    function addtext(e) {
        let new_list = [...lists];
        if (new_list[currentRow][currentCol][2] === 1 && e.keyCode === 13) {
            let formula = e.target.value.replace(/\s+/g, '');
            if (formula.indexOf('sum/Sum') !== -1) {
                console.log("formula");
                let left = formula.indexOf('(');
                let mid = formula.indexOf(':');
                let right = formula.indexOf(')');
                if (left !== -1 && mid !== -1) {
                    let pos1 = formula.substring(left+1,mid);
                    let pos2 = formula.substring(mid+1, right);
                    let [r1, c1] = tonum(pos1);
                    let [r2, c2] = tonum(pos2);
                    let count = 0;
                    if (r1 === r2) {
                        for (let i = c1; i <= c2; i++) { count += Number(lists[i][r1][0]); }
                    }
                    else if (c1 === c2) {
                        for (let i = r1; i <= r2; i++) {count += Number(lists[c1][i][0]); }
                    }
                    let new_list = [...lists];
                    new_list[currentRow][currentCol][0] = count;
                    setLists(new_list);
                    e.target.value = count;
                    return;
                }
            }   
            
            if (formula.indexOf('+') !== -1) {
                let mid = formula.indexOf('+');
                let pos1 = formula.substring(1, mid);
                let pos2 = formula.substring(mid+1, formula.length);
                let [r1, c1] = tonum(pos1);
                let [r2, c2] = tonum(pos2);
                console.log(r1, c1, r2, c2);
                
                let new_list = [...lists];
                let result1 = new_list[c1][r1][0];
                let result2 = new_list[c2][r2][0];
                console.log(result1, result2);
                new_list[currentRow][currentCol][0] = Number(result1)+Number(result2);
                setLists(new_list);
                e.target.value = Number(result1)+Number(result2);
                return;
            }
            if (formula.indexOf('-') !== -1) {
                let mid = formula.indexOf('-');
                let pos1 = formula.substring(1, mid);
                let pos2 = formula.substring(mid+1, formula.length);
                let [r1, c1] = tonum(pos1);
                let [r2, c2] = tonum(pos2);
                console.log(r1, c1, r2, c2);
                
                let new_list = [...lists];
                let result1 = new_list[c1][r1][0];
                let result2 = new_list[c2][r2][0];
                console.log(result1, result2);
                new_list[currentRow][currentCol][0] = Number(result1)-Number(result2);
                setLists(new_list);
                e.target.value = Number(result1)-Number(result2);
                return;
            }
             console.log(formula);
        }
        if (e.target.value === "=") {
            new_list[currentRow][currentCol][2] = 1;
        }
        console.log(currentRow, currentCol);
        new_list[currentRow][currentCol][1] = 1;
        new_list[currentRow][currentCol][0] = e.target.value;
        if (e.keyCode === 13) {
            cleantext(currentRow, currentCol);
            if (currentRow !== (row-1)) {setCurrentRow(currentRow+1);}  
        }
        setLists(new_list);
    }

    function cleantext(r, c) {
        if (lists[r][c][1] === 0) {
            return;
        }
        else {
            let new_input = in_put;
            new_input.target.value = "";
            setIn_put(new_input);
        }
        
    }

    function currentrowcol(rindex, cindex) {
        if (currentRow !== -1 && currentCol !== -1) {cleantext(currentRow, currentCol);} 
        setCurrentRow(rindex);
        setCurrentCol(cindex);
        setLists(lists);
    }
    var clickTimer = null;

    function changeinput(e) {
        if(clickTimer) {
            window.clearTimeout(clickTimer);
            clickTimer = null;
        }
        
        clickTimer = window.setTimeout(function(){
            setIn_put(e);
            console.log('單');
        }, 300);
  
        // console.log(currentRow, currentCol);
        
        // console.log(e);
    }

    function changeinput_dbclick(e) {
        if(clickTimer) {
            window.clearTimeout(clickTimer);
            clickTimer = null;
        }
        if (currentRow !== -1 && currentCol !== -1 && lists[currentRow][currentCol][1] === 1) {
            console.log('hi2');
            e.target.value = lists[currentRow][currentCol][0];
        }
        setIn_put(e);
       // your click process code here
        console.log('雙');
    }
    function background(rindex, cindex, i) {
        // console.log(lists);
        if (cindex === 0 || rindex === 0) {
            return i;
        }
        else {
            return <input type={"text"} style={backgroundstyle(rindex, cindex) ,{width : "100%"}, {height : "100%"}} onKeyUp={addtext}  onClick={changeinput} onDoubleClick={changeinput_dbclick} placeholder={i} ></input>
        }
    }

    function backgroundstyle(rindex, cindex) {
        if (rindex === currentRow && cindex === currentCol) {
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
                <table style={{position : 'relative', left : 33}}>
                    {lists.map((e, rindex) => <tr>{e.map((i, cindex) => <td style={backgroundstyle(rindex, cindex)} onMouseDown={() => currentrowcol(rindex, cindex)} >{background(rindex, cindex, i[0])}</td>)}</tr>)}
                </table>
            </>
        )
    }

    return (
        <>
            <Button  onClick={addRow} style={{position : "relative", top : 35}}>+</Button>
            <Button  onClick={deleteRow} style={{position : "relative", top : 70, right : 40}}>-</Button> 
            <Button  onClick={addCol} style={{position : "relative", right : 40}}>+</Button>
            <Button  onClick={deleteCol} style={{position : "relative", right : 40}}>-</Button>
            {Table()}
            
        </>
    )
}

export default FakeSheet;
