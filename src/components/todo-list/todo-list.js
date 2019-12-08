import React from "react";
import TodoListItem from "../todo-list-item/todo-list-item";
import './todo-list.css';

const ToDoList = ({todos, onDeleted, onToggleDone, onToggleImportant}) => {
    const elements = todos.map((item) =>{
        const {id, ...others} = item;
        return (
            <li key={id} className='list-group-item'>
                <TodoListItem {...others}
                            onDeleted={() => onDeleted(id)}
                              onToggleDone={() => onToggleDone(id)}
                              onToggleImportant={() => onToggleImportant(id)}/>
            </li>
        )
    });

    return (
        <ul className='list-group todo-list'>
            {elements}
        </ul>
    )
};

export default ToDoList;