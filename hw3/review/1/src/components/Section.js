import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: false };
    }

    handleCheck = (e) => {
        this.props.check(this.props.id);
        console.log("before setstate",this.state.checked);
        console.log("e.target",e.target.checked);
        this.setState( prevState => ({ checked: e.target.checked }));
        
    };

    handleDel = (e) => {
        this.props.delete(this.props.id);
        console.log("Delete", this.props.id);
    };

    render() {
        return (
            <li className={"todo-app__item"+ (this.props.show?"":" disappear")} >
                <div className="todo-app__checkbox">
                    <input type='checkbox' id={this.props.id} defaultChecked={this.state.checked} onClick={this.handleCheck}/>
                    <label htmlFor={this.props.id}></label>
                </div>
                <h1 className={"todo-app__item-detail"+ (this.state.checked?" checked":"")} >
                    {this.props.todo}
                </h1>
                <img src="/img/x.png" className="todo-app__item-x" onClick={this.handleDel}/>
            </li>
        );
    }
}

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    clear = () => { 
        this.setState(prevState => {
            let newitems = [...prevState.items];
            for (var i = newitems.length - 1; i >= 0; i--) {
                if (newitems[i].checked) newitems.splice(i,1);
            }
            if (newitems.length === 0) this.props.empty();
            return { items: newitems};
        });
    };

    filter = (t) => { 
        this.setState(prevState => {
            let newitems = [...prevState.items];
            switch(t) {
                case "all":
                    for (var i = newitems.length - 1; i >= 0; i--) 
                        newitems[i].show = true;
                    break;
                case "active":
                    for (var i = newitems.length - 1; i >= 0; i--)
                        newitems[i].show = (newitems[i].checked)?false:true; 
                    break;
                case "complete":
                    for (var i = newitems.length - 1; i >= 0; i--)
                        newitems[i].show = (newitems[i].checked)?true:false; 
                    break;
                default:
                    console.log("wrong condition",t)
            }
            return { items: newitems};
        });
    };

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            let item = { 
                            key: e.target.value+this.state.items.length.toString(), // unique key
                            todo: e.target.value, 
                            checked: false,
                            show: true
                        };
            this.props.incLeft();
            this.setState(prevState => ({ items: [...prevState.items, item] }));
            e.target.value = "";
        }
    };

    _handleCheck = (id) => {
        this.setState(prevState => {
            let newitems = [...prevState.items];
            let prevCheck = prevState.items[id].checked;
            newitems[id].checked = !prevCheck;
            if (prevCheck){
                this.props.incLeft();
                this.props.checkComplete(newitems.length);
            } else {
                this.props.decLeft();
            }
            return { items: newitems};
        });
    };

    _handleDel = (id) => {
        this.setState(prevState => {
            let newitems = [...prevState.items];
            let prevCheck = prevState.items[id].checked;
            newitems.splice(id,1);
            console.log(newitems);
            if (!prevCheck) this.props.decLeft();
            if (newitems.length === 0) this.props.empty();
            this.props.checkComplete(newitems.length);
            return { items: newitems};
        });
    };

    render() {
        return (
            <section className="todo-app__main">
                <input className="todo-app__input" placeholder="What needs to be done?" onKeyDown={this._handleKeyDown}/>
                <ul className="todo-app__list">
                    { this.state.items.map((item, index) => (
                        <Item key={item.key} todo={item.todo} id={index} show={item.show}
                            check={this._handleCheck} delete={this._handleDel}/>
                    ))}
                </ul>
            </section>
        );
    }
}


export default Section;