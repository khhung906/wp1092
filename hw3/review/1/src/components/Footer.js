import React, { Component } from 'react';

class Footer extends Component {
    
    all = (e) => {this.props.alert("all")};
    active = (e) => {this.props.alert("active")};
    complete = (e) => {this.props.alert("complete")};
    clear = (e) => {this.props.alert("clear")};

    render() {
        return (
            <footer className={"todo-app__footer"+(this.props.show?"":" disappear")} id="todo-footer">
                <div className="todo-app__total">
                    <p>{this.props.text} left</p> 
                </div>
                <ul className="todo-app__view-buttons">
                    <button onClick={this.all}>All</button>
                    <button onClick={this.active}>Active</button>
                    <button onClick={this.complete}>Completed</button>
                </ul>
                <div className={"todo-app__clean"+(this.props.show_clear?"":" hidden")}>
                    <button onClick={this.clear} >Clear completed</button>
                </div>
            </footer>
        );
    }
}

export default Footer;