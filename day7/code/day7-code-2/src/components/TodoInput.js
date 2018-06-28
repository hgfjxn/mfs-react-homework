import React from "react";
import classnames from "classnames";

export default class TodoInput extends React.Component {
  state = { title: this.props.title || "" };

  handleSubmit = e => {
    if (e.which === 13) {
      const title = e.target.value.trim();
      if (title.length > 0) {
        this.props.onSave(title);
        if (this.props.newTodo) {
          this.setState({ title: "" });
        }
      }
    }
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleBlur = e => {
    const title = e.target.value.trim();
    if (!this.props.newTodo && title.length > 0) {
      this.props.onSave(title);
    }
  };

  render() {
    return (
      <input
        type="text"
        className={classnames({
          edit: this.props.editing,
          "new-todo": this.props.newTodo
        })}
        autoFocus= "true"
        placeholder={this.props.placeholder}
        value={this.state.title}
        onKeyDown={this.handleSubmit}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}
