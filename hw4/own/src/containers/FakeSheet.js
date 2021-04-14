import React, { useState } from 'react';
import Header from "../components/Header";
import Cell from "../components/Cell";
import ARbtn from "../components/ARbtn";
import DRbtn from "../components/DRbtn";
import ACbtn from "../components/ACbtn";
import DCbtn from "../components/DCbtn";


function genSheet(){
    let lists = Array(101).fill("").map(() => new Array(26));
    let alphabets = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N",
                                           "O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    for(let column = 0; column < 27; column++){
        lists[0][column] = {text: alphabets[column], id: column, style:{}, formula: ''};
    }
    for(let row = 1; row < 101; row++){
        lists[row][0] = {text: row, id: row*100};
        for(let column = 1; column < 27; column++){
            lists[row][column] = {text: "", id: row*100+column, style:{}, formula: ''};
        }
    }
    return(lists);
}


function FakeSheet(){
    const[sheets, SetSheet] = useState(genSheet());
    const[mouse_pos, Setmouse] = useState([0, 0]);
    const[sheet_size, Setsize] = useState([101, 27]);
    const alphabets = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N",
                                           "O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    
    
    function clear(){
        let new_sheet = [...sheets];
        for(let x = 1; x < sheet_size[0]; x++){
            for(let y = 1; y < sheet_size[1]; y++){
                new_sheet[x][y] = {text: "", id: x*100+y, style:{}, formula: ''};
            }
        }
        SetSheet(new_sheet);
    }
    
    function change_val(x, y, val, req){
        let new_sheet = [...sheets];
        if(req === 'text') new_sheet[x][y].text = val;
        else if(req === 'formula') new_sheet[x][y].formula = val;
        SetSheet(new_sheet);
    }
    
    function focus_darken(x, y){
        let new_sheets = [...sheets];
        for(let row = 0; row < sheet_size[0]; row++){
            new_sheets[row][0].style = {};
            for(let column = 1; column < sheet_size[1]; column++){
                new_sheets[row][column].style = {};
            }
        }
//        for(let row = 0; row < sheet_size[0]; row++){
//            new_sheets[row][y].style = {background: '#26ca299b'};
//        }
//        for(let column = 0; column < sheet_size[1]; column++){
//            new_sheets[x][column].style = {background: '#26ca299b'};
//        }
        new_sheets[0][y].style = {background: '#26ca299b'};
        new_sheets[x][0].style = {background: '#26ca299b'};
        SetSheet(new_sheets);
        Setmouse([x, y]);
        //console.log(sheets);
    }
    
    function reinit_id(sheet){
        let new_sheet = [...sheet];
        new_sheet[0][0] = {text: "", id: 0, style:{}};
        for(let column = 1; column < sheet_size[1]; column++){
            new_sheet[0][column] = {text: alphabets[parseInt(column/27)]+alphabets[(column-1)%26+1], id: column, style:{}, formula: ''};
        }
        for(let row = 1; row < sheet_size[0]; row++){
            new_sheet[row][0] = {text: row, id: row*100};
            for(let column = 1; column < sheet_size[1]; column++){
                new_sheet[row][column].id = row*100+column;
                //sheet[row][column].text = '';
            }
        }
        console.log(new_sheet);
        SetSheet(new_sheet);
    }
    
    function add_row(){
        let new_sheets = [...sheets];
        for(let column = 0; column < sheet_size[0]; column++){
            new_sheets[column].splice(mouse_pos[1], 0, {text: "", id: sheet_size[0]*100+sheet_size[1]*100+column, style:{}, formula: ''});
        }
        new_sheets[mouse_pos[0]][mouse_pos[1]].style = sheets[mouse_pos[0]][mouse_pos[1]+1].style;
        sheet_size[1]++;
        Setsize(sheet_size);
        reinit_id(new_sheets);
    }
    
    function add_column(){
        let new_sheets = [...sheets];
        let new_column = Array(sheet_size[1]+1);
        for(let row = 0; row < sheet_size[1]; row++){
            new_column[row] = {text: "", id: sheet_size[0]*100+sheet_size[1]*100+row, style:{}, formula: ''};
        }
        new_column[mouse_pos[1]].style = sheets[mouse_pos[0]][mouse_pos[1]].style;
        new_sheets.splice(mouse_pos[0], 0, new_column);
        sheet_size[0]++;
        Setsize(sheet_size);
        reinit_id(new_sheets);
    }
   
    function delete_row(){
        // console.log(sheets);
        if(mouse_pos === [0, 0]){
            return
        }
        else{
            let new_sheets = [...sheets];
            for(let column = 0; column < sheet_size[0]; column++){
                new_sheets[column].splice(mouse_pos[1], 1);
            }
            sheet_size[1]--;
            Setsize(sheet_size);
            reinit_id(new_sheets);
        }
    }
 
    function delete_column(){
        if(mouse_pos === [0, 0]){
            return
        }
        else{
            let new_sheets = [...sheets];
            new_sheets.splice(mouse_pos[0], 1);
            sheet_size[0]--;
            Setsize(sheet_size);
            reinit_id(new_sheets);
            // SetSheet(reinit_id(new_sheets));
        }
    }
    
    return(
        <>
            <Header text="FakeSheet" clear={clear}/>
            <div className="sheet">
                <ARbtn add={add_row}/ > <DRbtn delete_row={delete_row}/ ><br/>
                <ACbtn add={add_column}/ > <DCbtn delete_column={delete_column}/>
                <table className="table-style" border="2">
                    <tbody>
                        {sheets.map(item => (<tr>{item.map(i => <Cell text={i.text} id={i.id} change={change_val} darken={focus_darken} style = {i.style} sheet={sheets}/>)}</tr>))} 
                    </tbody> 
                </table>
            </div>
        </>
    );
}

export default FakeSheet;

