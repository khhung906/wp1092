import React from "react";

function Header({ text, clear}){
    function clear_elements(){
        clear();
    }
    return(<div className="header">
              <span className="logo">{text}</span>
              <div className="header-right">
                <span className="active" href="#home">Sheet</span>
                <span onClick={clear_elements}>clear</span>
              </div>
            </div>);
}

export default Header;