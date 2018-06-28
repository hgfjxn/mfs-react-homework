import { combineReducers } from 'redux';

import { ADD_TODO, DELETE_TODO, EDIT, TOGGLE_TODO, TOGGLE_ALL, CLEAR_COMPLETED, VISIBLE_FILTER } from "./actionTypes"
import { SHOW_ALL} from "./filterTypes.js"

const initState = []

const todos = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => (Math.max(maxId, todo.id)), -1) + 1,
          title: action.title,
          completed: false
        }
      ]
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case EDIT:
      return state.map(todo => todo.id === action.id ? { ...todo, title: action.title } : todo)
    case TOGGLE_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    case TOGGLE_ALL:
      const allCompleted = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !allCompleted
      }))
    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)
    default:
      return state
  }
}

const visibleFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case VISIBLE_FILTER:
      return action.filter
    default:
      return state
  }
}

const reducers = combineReducers({
  todos,
  visibleFilter
})

export default reducers