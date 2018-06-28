import * as types from "./actionTypes.js"

export const addTodo = title => ({type: types.ADD_TODO, title})
export const deleteTodo = id => ({type: types.DELETE_TODO, id})
export const editTodo = (id, title) => ({ type: types.EDIT, id, title})
export const toggleTodo = (id) => ({type: types.TOGGLE_TODO, id})
export const toggleAll = () => ({type: types.TOGGLE_ALL})
export const clearCompleted = ()=>({type: types.CLEAR_COMPLETED})
export const setVisibleFilter = filter => ({type: types.VISIBLE_FILTER, filter})
