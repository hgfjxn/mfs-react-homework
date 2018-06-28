import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../filterTypes.js";

export const getVisibleTodos = (visibleFilter, todos) => {
  switch (visibleFilter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    default:
      return todos
  }
};

export const getCompletedTodoCount = todos => {
  return todos.reduce((count, todo) => {
    return todo.completed ? count + 1 : count;
  }, 0);
};