import React, { useState } from "react";


function Cell({text, id, change, darken, style}){
    const[value, Setvalue] = useState("");
    
    function change_value(e){
        Setvalue(e.target.value);
        change(Math.round(id/100), id%100, e.target.value);
    }
    
    function rc_darken(){
        darken(Math.round(id/100), id%100);
        //block_style = {background:'grey'};
    }
    
    function clean_input(e){
        console.log("cool");
        e.target.value = '';
    }
    
    if(id <= 100){
        return(<td className="first-row-column" style={style}>{text}
                </td>);
    }
               
    else if(id%100 == 0){
        return(<td style={style}>{text}
                </td>);
    }
    else{
        return(<td style={style}>
           <input className="block" type="text" id={id} key={id} placeholder={text}
                onKeyPress={change_value} onClick={rc_darken} onBlur={clean_input}/>
           </td>);           
    }
}



export default Cell;