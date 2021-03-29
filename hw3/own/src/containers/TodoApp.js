import React, { Component } from "react";
import Header from "../components/Header";
import Item from "../components/Item";


class TodoApp extends Component {
    constructor(){
        super();
        this.state = {
            left: 0,
            // list of todos
            all_list: [], 
            active_list: [], 
            completed_list: [], 
            show_list: [],
            // state of what we have shown
            now_state: 0
        }
        this.add_tolist = this.add_tolist.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.Change_active = this.Change_active.bind(this);
        this.Change_completed = this.Change_completed.bind(this);
        this.Change_all = this.Change_all.bind(this);
        this.update = this.update.bind(this);
        this.Clear_completed = this.Clear_completed.bind(this);
        this.Done = this.Done.bind(this);
    }
    
    componentDidMount(){
        setInterval(this.update, 500);
    }
    
    update(){
        if(this.state.now_state === 0){
            this.setState({show_list: [...this.state.all_list]});
        }
        else if(this.state.now_state === 1){
            this.setState({show_list: [...this.state.active_list]});
        }
        else if (this.state.now_state === 2){
            this.setState({show_list: [...this.state.completed_list]});
        }
        this.setState({left: this.state.active_list.length});
    }
    
    add_tolist(e){
        if(e.key === 'Enter' && e.target.value !== ''){
            if(this.state.active_list.includes(e.target.value)){
                alert(e.target.value+' is already in list');
            }
            else{
                this.setState({all_list: this.state.all_list.concat([e.target.value])});
                this.setState({active_list: this.state.active_list.concat([e.target.value])});
            }
            e.target.value = '';
            //this.setState({show_list: this.state.all_list});
        }
        //this.setState({this.state.all_list.push(e.target.value)})
    }
    
    deleteTodo(id){ 
        this.setState({all_list: this.state.all_list.filter(todo => todo !== id)});
        this.setState({active_list: this.state.active_list.filter(todo => todo !== id)});
        this.setState({completed_list: this.state.completed_list.filter(todo => todo !== id)});
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
        if(d === 1){
            this.setState({active_list: this.state.active_list.filter(todo => todo !== id)});
            this.setState({completed_list: this.state.completed_list.concat([id])});
        }
        else{
            this.setState({active_list: this.state.active_list.concat([id])});
            this.setState({completed_list: this.state.completed_list.filter(todo => todo !== id)});
        }
    }
    
    
    Clear_completed(){
        this.setState({active_list: this.state.active_list.filter(todo => !this.state.completed_list.includes(todo))});
        this.setState({all_list: this.state.all_list.filter(todo => !this.state.completed_list.includes(todo))});
        this.setState({completed_list: []});
    }
    
    render() {
        const { left, all_list, active_list, completed_list, now_state } = this.state
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <input className="todo-app__input" placeholder="What needs to be done?" onKeyPress={this.add_tolist}/>
                    <ul className="todo-app__list" id="todo-list">
                        {this.state.show_list.map(todo => (<Item text={todo} id={todo} key={todo} 
                                                            deleteTodo={this.deleteTodo} Done={this.Done} Completed={this.state.completed_list}/>))}
                    </ul>
                </section>
                <footer className="todo-app__footer" id="todo-footer">
                    <div className="todo-app__total">{this.state.left} left</div>
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
