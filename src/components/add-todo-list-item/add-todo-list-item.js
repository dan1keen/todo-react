import React, {Component} from "react";
import './add-todo-list-item.css';

export default class AddTodoListItem extends Component{
    constructor() {
        super();
        this.state= {
            label: ''
        }
    }

    render() {
        return (
            <form className='add-form ' onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <input id='itemName' type='text' className='form-control'
                    onChange={this.onLabelChange}
                    placeholder='What needs to be done'
                    value={this.state.label}/>
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-success form-control'>Add Item</button>
                </div>
            </form>
        )
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const {onAdd} = this.props;
        const {label} = this.state;
        onAdd(label);
        this.setState({
            label: ''
        })
    }
}