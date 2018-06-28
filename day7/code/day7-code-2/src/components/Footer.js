import React, { Component } from "react";
import Link from "./FooterLink"
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../filterTypes.js";

const FilterTypesToName = {
  [SHOW_ALL]: "ALL",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: "Completed"
}
export default class Footer extends Component {
  render() {
    const { activeCount, completedCount, onClearCompleted } = this.props;
    const activeWord = activeCount === 1 ? "item" : "items";
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeCount || "NO"}</strong> {activeWord} left
        </span>
        <ul className="filters">
          {
            Object.keys(FilterTypesToName).map(filterType =>
              <li key={filterType}>
                <Link filter={filterType} >{FilterTypesToName[filterType]}</Link>
              </li>
            )
          }
        </ul>
        {completedCount > 0 && <button className="clear-completed" onClick={onClearCompleted}> Clear Completed</button>}
      </footer>
    );
  }
}