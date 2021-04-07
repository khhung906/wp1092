import React, { Component } from "react";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
//import Footer from "../components/Footer";

class TodoApp extends Component {
    render() {
        return (
            <div id="root" className="todo-app__root">
                <Header text="todos" />
                <TodoList />
            </div>
        );
    }
}

export default TodoApp;
