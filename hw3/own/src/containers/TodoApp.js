import React, { Component } from "react";
import Header from "../components/Header";
import Item from "../components/Item";


class TodoApp extends Component {
    constructor(){
        super();
        this.state = {
            // list of todos
            all_list: [], 
            // state of what we have shown
            now_state: 0
        }
        this.add_tolist = this.add_tolist.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.Change_active = this.Change_active.bind(this);
        this.Change_completed = this.Change_completed.bind(this);
        this.Change_all = this.Change_all.bind(this);
        this.Clear_completed = this.Clear_completed.bind(this);
        this.Done = this.Done.bind(this);
    }
    
    add_tolist(e){
        if(e.key === 'Enter' && e.target.value !== ''){
            if(this.state.all_list.some(t => t.text === e.target.value)){
                alert(e.target.value+' is already in list');
            }
            else{
                this.setState({all_list: this.state.all_list.concat({text: e.target.value, done: 0})});
            }
            e.target.value = '';
        }
    }
    
    deleteTodo(id){ 
        this.setState({all_list: this.state.all_list.filter(todo => todo.text !== id)});
    }
    
    Change_all(){
        this.setState({now_state: 0});
    }
    
    Change_active(){
        this.setState({now_state: 1});
    }
    
    Change_completed(){
        this.setState({now_state: 2});
    }
    
    Done(d, id){
        let new_list = this.state.all_list;
        if(d === 1){
            for(let i in new_list){
                if(new_list[i].text === id){
                    new_list[i].done = 1;
                }
            }
        }
        else{
            for(let i in new_list){
                if(new_list[i].text === id){
                    new_list[i].done = 0;
                }
            }
        }
        this.setState({all_list: new_list});
    }
    
    Clear_completed(){
        this.setState({all_list: this.state.all_list.filter(todo => todo.done === 0)});
    }
    
    show = () =>{
        let new_list = [];
        if(this.state.now_state === 0){
            new_list = this.state.all_list;
        }
        else if(this.state.now_state === 1){
            for(let i in this.state.all_list){
                if(this.state.all_list[i].done === 0){
                    new_list.push(this.state.all_list[i]);
                }
            }
        }
        else{
            for(let i in this.state.all_list){
                if(this.state.all_list[i].done === 1){
                    new_list.push(this.state.all_list[i]);
                }
            }
        }
        return(
            <ul className="todo-app__list" id="todo-list">
                {new_list.map(todo => (<Item text={todo.text} id={todo.text} key={todo.text} 
                                                deleteTodo={this.deleteTodo} Done={this.Done} Completed={todo.done}/>))}
            </ul>)
    }
            
    count = () => {
        let left = 0;
        for(let i in this.state.all_list){
            if(this.state.all_list[i].done === 0){
               left++;
            }
        }
        return(<div className="todo-app__total">{left} left</div>)
    }
    render() {
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" onKeyPress={this.add_tolist}/>
                    {this.show()}
                </section>
                <footer className="todo-app__footer" id="todo-footer">
                    {this.count()}
                    <ul className="todo-app__view-buttons">
                        <button onClick={this.Change_all}>All</button>
                        <button onClick={this.Change_active}>Active</button>
                        <button onClick={this.Change_completed}>Completed</button>
                    </ul>
                    <div className="todo-app__clean">
                        <button onClick={this.Clear_completed}>Clear complete</button>
                    </div>
                </footer>
            </>
        );
    }
}

export default TodoApp;
