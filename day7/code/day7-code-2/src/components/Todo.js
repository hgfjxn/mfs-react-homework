import React, { Component } from "react"
import TodoInput from "./TodoInput";
import classnames from 'classnames'

export default class Todo extends Component {
    state = { editing: false }
    handleDoubleClick = () => {
        this.setState({ editing: true })
    }

    handleSave = (id, title) => {
        title = title.trim()
        if (title.length === 0) {
            this.props.deleteTodo(id)
        } else {
            this.props.editTodo(id, title)
        }
        this.setState({ editing: false })
    }

    render() {
        const { todo, toggleTodo, deleteTodo } = this.props
        let element
        if (this.state.editing) {
            element = (
                <TodoInput title={todo.title} onSave={(title) => this.handleSave(todo.id, title)} editing={this.state.editing} />
            )
        } else {
            element = (
                <div className="view">
                    <input className="toggle" type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                    <label onDoubleClick={this.handleDoubleClick}>{todo.title}</label>
                    <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
            )
        }
        return (
            <li className={classnames({
                editing: this.state.editing,
                completed: todo.completed
            })}>
                {element}
            </li>
        )
    }
}