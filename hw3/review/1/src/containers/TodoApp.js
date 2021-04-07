import React, { Component } from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.sec = React.createRef();
        this.state = {  
                        left: 0,
                        show_footer: false,
                        show_clear: false
                     };
    }

    _checkComplete = (num) => {this.setState( prevState => ({ show_clear: !(num===prevState.left)}))};
    _empty = () => {this.setState( prevState => ({show_footer: false}))};
    _alert = (t) => { 
            if(t === "clear"){
                this.sec.current.clear();
                this._checkComplete(this.state.left);
            } else {
                this.sec.current.filter(t);
        }};
    _incLeft = () => { this.setState( prevState => ({ left: prevState.left + 1, show_footer: true}))};
    _decLeft = () => { this.setState( prevState => ({ left: prevState.left - 1, show_clear: true}))};

    render() {
        return (
            <>
                <Header text="todos" />
                <Section ref={this.sec} incLeft={this._incLeft} decLeft={this._decLeft} 
                        empty={this._empty} checkComplete={this._checkComplete}/>
                <Footer text={this.state.left} show={this.state.show_footer} 
                        show_clear={this.state.show_clear} alert={this._alert} />
            </>
        );
    }
}

export default TodoApp;
