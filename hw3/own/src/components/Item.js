import React from "react";


class Todo extends React.Component {
    delete = () => {
        const { text, deleteTodo } = this.props;
        deleteTodo(text);
    };
    
    done = () =>{
        const {text, Done, Completed} = this.props;
        if(Completed){
            Done(0, text);
        }
        else{
            Done(1, text);
        }
    };
    
    todo = () =>{
        const {id, Completed} = this.props;
        let tStyle = {};
        if(Completed){
            tStyle = {background: '#26ca299b'};
        }
        return(<div className="todo-app__checkbox">
                <input type="checkbox" id={id} onClick={this.done}/>
                <label htmlFor={id} style={tStyle}/>
            </div>)
    }
               
    todo_text = () =>{
        const {text, Completed} = this.props;
        let pStyle = {opacity: 0.5, textDecorationLine: ' line-through'};
        if(!Completed){
            pStyle = {};
        }
        return(<h1 className="todo-app__item-detail" style={pStyle} >{text}</h1>)
    }

    render() {
    return (
        <li className="todo-app__item">
            {this.todo()}
            {this.todo_text()}
            <img src="./img/x.png" className="todo-app__item-x" onClick={this.delete}/>
        </li>
    );
  }
    
}

export default Todo
