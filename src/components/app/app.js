import React, {Component} from "react";
import AppHeader from "../app-header/app-header";
import ToDoList from "../todo-list/todo-list";
import SearchPanel from "../search-panel/search-panel";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import './app.css';
import AddTodoListItem from "../add-todo-list-item/add-todo-list-item";
export default class App extends Component{
    maxId = 100;

    constructor() {
        super();
        this.state = {
            todoData: [
                this.createItem('Drink Coffee'),
                this.createItem('Sleep'),
                this.createItem('Make awesome app'),
            ],
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const result = [...before, ...after];

            return {
                todoData: result
            }

        });
    };
    createItem = (text) => {
        return {
            label: text,
            important: false,
            done: false,
            id: this.maxId++
        }
    }
    addItem = (text) => {
        const newItem = this.createItem(text)
        this.setState(({todoData}) => {
            const result = [...todoData, newItem]

            return {
                todoData: result
            }
        });
    };

    searchItem = (items,term) => {
        if(term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        });

    };
    searchItemFunction = (term) => {
        this.setState({
            term

        });
    }

    toggleProp = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);
        const newItem = {...arr[idx], [propName]: !arr[idx][propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];

    }

    onToggleImportant = (id) =>{
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProp(todoData, id, 'important')
            }
        })
    };
    onToggleDone = (id) =>{
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProp(todoData, id, 'done')
            }
        })
    };
    filter = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((el) => !el.done);
            case 'done':
                return items.filter((el) => el.done);
            default:
                return items;
        }
    };

    onFilterChange = (filter) =>{
        this.setState({
            filter
        });
    }
    render() {
        const {todoData, term, filter} = this.state;
        const visible = this.filter(this.searchItem(todoData, term), filter);

        const doneEl = visible
                        .filter((el) => el.done)
                        .length;
        const todoEl = visible.length - doneEl;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoEl} done={doneEl}/>
                <div className="top-panel d-flex">
                    <SearchPanel searchItem ={this.searchItemFunction} />
                    <ItemStatusFilter filter={filter}
                    onFilterChange ={this.onFilterChange}/>
                </div>
                <ToDoList todos = {visible}
                          onDeleted={this.deleteItem}
                        onToggleDone = {this.onToggleDone}
                        onToggleImportant = {this.onToggleImportant}/>
                <AddTodoListItem onAdd={this.addItem} />
            </div>
        );
    }
}



