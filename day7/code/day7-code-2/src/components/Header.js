import React from "react";
import { connect } from "react-redux";
import TodoInput from "./TodoInput.js";
import { addTodo } from "../actions.js";

export class Header extends React.Component {
  render() {
    const {addTodo} = this.props
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoInput
          newTodo
          onSave={title => {
            if (title.length !== 0) {
              addTodo(title);
            }
          }}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

export default connect(null, { addTodo })(Header);
