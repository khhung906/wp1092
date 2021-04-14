import React, { useState } from "react";

// only allow positive int
function isNumeric(value) {
    return /^\d+$/.test(value);
}

// allow all int
function _isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function detect_val(command){
    let start_pos = -1;
    for (let i = 1; i < command.length; i++){
        if((/[a-zA-Z]/).test(command[i]) === false && i > 1){
            start_pos = i;
            break;
        }
    }
    if(isNumeric(command.slice(start_pos, command.length)) && start_pos > 1){
        return [parseInt(command.slice(start_pos, command.length)), 
                Char_to_pos(command.slice(1, start_pos))];
    }
    return 'no_ans';
}

function Char_to_pos(chars){
    let pos = 0;
    chars = chars.toLowerCase();
    for(let i = 0; i < chars.length; i++){
        pos += (chars[i].charCodeAt(0)-96)*Math.pow(26, chars.length-i-1);
    }
    return pos;
}

function calculate(chars, sheet){
    let add = chars.indexOf("+");
    let minus = chars.indexOf("-");
    if(add !== -1){
        if(isNumeric(chars.slice(1, add)) && chars.slice(add+1, chars.length)){
            return (parseInt(chars.slice(1, add)) + parseInt(chars.slice(add+1, chars.length)));
        }
    }
    if(minus !== -1){
        if(isNumeric(chars.slice(1, minus)) && chars.slice(minus+1, chars.length)){
            return (parseInt(chars.slice(1, minus)) - parseInt(chars.slice(minus+1, chars.length)));
        }
    }
    return "no_ans";
}

function find_sum(chars, sheet){
    console.log(chars.slice(1, 4));
    if(chars.slice(1, 4) !== 'sum' && chars.slice(1, 4) !== 'Sum') {
        return 'no_ans';
    }
    let pos = chars.slice(5, chars.length-1).split(':');
    let left_up = detect_val('='+pos[0]);
    let right_down = detect_val('='+pos[1]);
    let total = 0;
    if(right_down === "no_ans" || left_up === "no_ans") return "no_ans";
    if(right_down[1] < left_up[1] || right_down[0] < left_up[0]) return "no_ans";
    if(right_down[0] >= sheet.length && right_down[1] >= sheet[0].length) return "no_ans";
    for(let i = left_up[0]; i <= right_down[0]; i++){
        for(let j = left_up[1]; j <= right_down[1]; j++){
            if(_isNumeric(sheet[i][j].text)) total += parseInt(sheet[i][j].text);
        }
    }
    return total;
}

function Cell({text, id, change, darken, style, sheet}){
    const[mode, Setmode] = useState("normal");
    const[c_status, Setcstatus] = useState("click");
    
    function change_value(e){
        if(mode === "normal"){
            change(Math.round(id/100), id%100, e.target.value, 'text');    
        }
        else if(mode === "formula"){
            let parse_e = e.target.value.replace(/\s+/g, '');
            let split_pos = detect_val(parse_e);
            let calc_ans = calculate(parse_e);
            let sum = find_sum(parse_e, sheet);
            if(split_pos !== "no_ans" && split_pos[0] < sheet.length && split_pos[1] < sheet[0].length){
                change(Math.round(id/100), id%100, sheet[split_pos[0]][split_pos[1]].text, 'text'); 
            }
            else if(calc_ans !== 'no_ans'){
                change(Math.round(id/100), id%100, calc_ans, 'text'); 
            }
            else if(sum !== 'no_ans'){
                change(Math.round(id/100), id%100, sum, 'text'); 
            }
            else{
                change(Math.round(id/100), id%100, "ERROR!", 'text'); 
            }
        }
        change(Math.round(id/100), id%100, e.target.value, 'formula'); 
    }
    
    function detect_input(e){
        if(c_status === "clear" && e.target.value.length <= 1){
            Setcstatus("~clear");
        }
        if(c_status === "clear" && e.target.value.length > 1){
            e.target.value = '';
            Setcstatus("~clear");
            Setmode("normal");
        }
        if(e.target.value === '='){
            Setmode("formula");      
        }
        else if(e.key === 'Enter'){
            change_value(e);
        }
    }
    
    function onclick(e){
        Setcstatus("clear");
        e.target.value = sheet[Math.round(id/100)][id%100].formula;
        darken(Math.round(id/100), id%100);
    }
    
    function ondclick(e){
        Setcstatus("~clear");
        e.target.value = sheet[Math.round(id/100)][id%100].formula;
        darken(Math.round(id/100), id%100);
    }
    
    function clean_input(e){
        change_value(e);
        e.target.value = '';
    }
    
    if(id <= 100){
        return(<td className="first-row-column" style={style}>{text}
                </td>);
    }
               
    else if(id%100 === 0){
        return(<td style={style}>{text}
                </td>);
    }
    else{
        return(<td style={style}>
           <input className="block" type="text" id={id} key={id} placeholder={text}
                onClick={onclick} onDoubleClick={ondclick} onChange={detect_input} onBlur={clean_input}/>
           </td>);           
    }
}



export default Cell;