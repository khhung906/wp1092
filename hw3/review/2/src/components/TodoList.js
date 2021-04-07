import React, { Component, useState } from "react";
const e = React.createElement;
var numOfTodo = 0;
var leftTodo = 0;
var AllList = [];
var ViewList = [];
var AcList = [];
var CpList = [];
var UnqList = [];
var Id = 0;

function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}

function isDuplicate(name) {
    if(UnqList.indexOf(name) === -1) return false;
    else return true;
}

function List() {
    if(numOfTodo > 0){
        return(e('ul', {className:"todo-app__list", id:"todo-list"}, AllList ));
    }
    else{
        return null;
    }
}

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {filter: "all"};
    }

    updateFilter = (name) => {
        this.setState({filter: name});
        ViewList = this.ShowList(this.state.filter);
    }

    ShowList = (name) => {
        switch(name) {
            case "all":
                return AllList;
            case "active":
                return AcList;
            case "completed":
                return CpList;
        }
    }

    render() {
        if(numOfTodo > 0){ 
            return(e('footer', {className: "todo-app__footer", id:"todo-footer"}, 
                    [e('div', {className: "todo-app__total"}, leftTodo + " left"),
                    e('button', {className: "todo-app__view-buttons", onClick: (event) => this.updateFilter("all", event)}, "All"),
                    e('button', {className: "todo-app__view-buttons", onClick: (event) => this.updateFilter("active", event)}, "Active"),
                    e('button', {className: "todo-app__view-buttons", onClick: (event) => this.updateFilter("completed", event)}, "Completed"),
                    e('div', {className: "todo-app__clean"}, "Clear Completed")])
                );
        }
        else{
            return null;
        }
    }
}


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {value: "",
                      numOfActive: 0, 
                      todoList: [],
                      activeList: [],
                      completedList: []};
    }

    Items(todoName){
        UnqList.push(todoName);
        console.log("UnqList = ", UnqList);
        return(
            <li key={Id} keyprop={todoName} className="todo-app__item">
                <div className= "todo-app__checkbox">
                    <input type= "checkbox" className="checked" id={Id} onChange={this.Completed}></input>
                    <label htmlFor={Id}></label>
                </div>
                <h1 className= "todo-app__item-detail">{todoName}</h1>
                <img src= "./img/x.png" className= "todo-app__item-x" 
                        onClick= {(event) => this.deleteTodo(todoName, event)}></img>
            </li>
        );
    }

    Completed = () => {
        this.setState({activeList: [], completedList: []});
        let c = document.getElementsByClassName("checked");
        console.log("ok");
        let n = 0;
        for(let i = 0; i < c.length ; i++){
            console.log(i);
            if(!c[i].checked){
                AcList.push(AllList[i]);
                n++;
            }
            else CpList.push(AllList[i]);
        }
        leftTodo = n;
        this.setState({numOfActive: n, activeList: AcList, completedList: CpList});
    }

    addTodo = (event) => {
        let todoName = trim(this.state.value);
        isDuplicate(todoName);
        console.log(todoName);
        if(isDuplicate(todoName)){
            alert("Duplicate task!");
            this.setState({value: ""});
        }
        else if(event.key === "Enter" && todoName !== "" && !isDuplicate(todoName)){
            console.log("Add");
            Id++;
            this.setState({value: ""});
            let newItem = this.Items(todoName);
            AllList.push(newItem);
            AcList.push(newItem);
            this.setState({todoList: AllList, activeList: AcList});
            numOfTodo++;
            console.log(numOfTodo);
            leftTodo = numOfTodo;
            this.setState({numOfActive: numOfTodo});
        }
    }

    deleteTodo = (i) => {
        console.log("Delete " + i);
        let d = UnqList.indexOf(i);
        console.log("d = ", d);
        UnqList.splice(d, 1);
        console.log("UnqList = ", UnqList);
        let fd = AllList.splice(d, 1);
        this.setState({todoList: AllList});
        let f = Math.min(AcList.indexOf(fd) < CpList.indexOf(fd));
        if(AcList.indexOf(fd) < CpList.indexOf(fd)){
            CpList.splice(f, 1);
        }
        else AcList.splice(f, 1);
        numOfTodo--;
        leftTodo = numOfTodo;
        this.setState({numOfActive: numOfTodo, activeList: AcList, completedList: CpList});
    }

    change = (event) => {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <section className="todo-app__main">
                <input className="todo-app__input" placeholder="What needs to be done?" 
                    value={this.state.value} onChange={this.change} 
                    onKeyDown={(event) => this.addTodo(event)} tabIndex="0"/>
                <List />
                <Footer />
            </section>
        );
    }
}

export default TodoList;