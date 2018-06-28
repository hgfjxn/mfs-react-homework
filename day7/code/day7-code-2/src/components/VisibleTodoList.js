import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Todo from "./Todo.js"
import * as TodoActions from "../actions"
import { getVisibleTodos } from "./selectTodo"

export class VisibleTodoList extends Component {
    render() {
        const { filteredTodos, actions } = this.props
        return (<ul className="todo-list">{
            filteredTodos.map(todo => {
                return <Todo key={todo.id} todo={todo} {...actions}/>
            })
        }
        </ul>)
    }
}

const mapStateToProps = state => ({
    filteredTodos: getVisibleTodos(state.visibleFilter, state.todos)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList);