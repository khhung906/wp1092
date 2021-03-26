import React from "react";


class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pStyle: {},
            tStyle: {}
        }
    }
    
    componentWillMount(){
        setInterval(this.change_style, 500);
        //this.change_style();
    }

    change_style = () =>{
        const{Completed, id} = this.props;
        if(Completed.includes(id)){
            this.setState({pStyle: {opacity: 0.5,
                                    textDecorationLine: ' line-through'}});
            this.setState({tStyle:{background: '#26ca299b'}});
        }
        else{
            this.setState({pStyle:{}});
            this.setState({tStyle:{}});
        }
    }
    
    delete = () => {
        const { text, deleteTodo } = this.props;
        deleteTodo(text);
    };
    
    done = () =>{
        const { text, Done, Completed } = this.props;
        if(Completed.includes(text)){
            Done(0, text);
        }
        else{
            Done(1, text);
        }
    };

    render() {
    const {text, id} = this.props;
    return (
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input type="checkbox" id={id} onClick={this.done}/>
                <label htmlFor={id} style={this.state.tStyle}/>
            </div>
            <h1 className="todo-app__item-detail" style={this.state.pStyle}>{text}</h1>
            <img src="./img/x.png" className="todo-app__item-x" onClick={this.delete}/>
        </li>
    );
  }
    
}

export default Todo
