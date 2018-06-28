import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as TodoActions from "../actions";
import Footer from "./Footer";
import { getCompletedTodoCount } from "./selectTodo"
import VisibleTodoList from "./VisibleTodoList.js"

class MainSection extends React.Component {
  render() {
    const { todosCount, completedCount, actions } = this.props;
    return (
      <section className="main">
        {
          <span>
            <input type="checkbox" className="toggle-all" checked={todosCount > 0 && todosCount === completedCount} onChange={actions.toggleAll}/>
          </span>
        }
        <VisibleTodoList />
        {
          <Footer
            activeCount={todosCount - completedCount}
            completedCount={completedCount}
            onClearCompleted={actions.clearCompleted}
          />
        }
      </section>
    );
  }
}

const mapStateToProps = state => ({
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state.todos)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSection);
