import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ENTRY_KEY, ESCAPE_KEY } from "./consts.js";
import classNames from 'classnames'
import 'todomvc-app-css/index.css'

import "./styles.css";

function Header(props) {
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        id="newTodo"
        className="new-todo"
        type="text"
        placeholder="what do you need todo?"
        onKeyDown={props.keyDown}
        onChange={props.change}
        autoFocus={true}
        autoComplete={"off"}
      />
    </header>
  );
}

function Main(props) {
  let activeTodoCount = props.items.map(item => {
    if (!item.completed) {
      return 1
    } else {
      return 0
    }
  }).reduce(((a, b) => a + b), 0)
  let totalCount = props.items.length;
  let todoItems =
    totalCount > 0 &&
    props.items.map(todo => {
      return (
        <Item
          key={todo.id}
          item={todo}
          onToggle={props.onToggle}
          onDestroy={props.onDestroy}
          onDoubleClick={props.onDoubleClick}
          onBlur={props.onBlur}
          onEditChange={props.onEditChange}
          onEditKeyDown={props.onEditKeyDown}
        />
      );
    });
  return (
    // 全部选中方法没有实现
    props.items.length > 0 && (
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          onChange={props.toggleAll}
          checked={activeTodoCount === 0}
        />
        <ul className="todo-list">{todoItems}</ul>
      </section>
    )
  );
}

function Item(props) {
  let { item, onToggle, onDestroy, onDoubleClick, onBlur, onEditKeyDown, onEditChange } = props
  return (
    <li className={classNames({ completed: item.completed, editing: item.editing })}>
      <div className="view">
        <input
          name={item.id}
          className="toggle"
          type="checkbox"
          checked={item.completed}
          onChange={onToggle}
        />
        <label title={item.id} className="todo" onDoubleClick={onDoubleClick}>{item.title}</label>
        <button name={item.id} className="destroy" onClick={onDestroy} />
      </div>
      <input name={item.id} id={item.id + "-edit"} className="edit" value={item.editText} onBlur={onBlur} onKeyDown={onEditKeyDown} onChange={onEditChange} />
    </li>
  );
}

function filterTodo(items, completed) {
  if (completed != null) {
    return items.filter(item => item.completed === completed)
  } else {
    return items
  }
}

function Footer(props) {
  let { items, completed, clearAllCompleted, onAll, onActived, onCompleted } = props
  let num = items.filter(item => !item.completed).length
  let activeTodoWord = num === 1 ? "item left" : " items left"
  let clearButton = filterTodo(items, true).length > 0 && (
    <button className="clear-completed" onClick={clearAllCompleted}>
      Clear All Completed
      </button>
  )

  return (
    items.length > 0 && (
      <footer className="footer">
        <span className="todo-count">
          <strong>{num}</strong> {activeTodoWord}
        </span>
        <ul className="filters">
          <li className="all">
            <a onClick={onAll} className={classNames({ selected: completed === null })}>ALL</a>
          </li>
          <li className="actived">
            <a onClick={onActived} className={classNames({ selected: completed !== null && !completed })}>Actived</a>
          </li>
          <li className="completed">
            <a onClick={onCompleted} className={classNames({ selected: completed != null && completed })}>Completed</a>
          </li>
        </ul>
        {clearButton}
      </footer>
    )
  );
}

class App extends Component {
  state = {
    input: "newTodo",//编辑元素id
    completed: null,//展示数据使用的选项
    items: []//所有todo list数据
  };

  newTodoKeyDown = e => {
    if (e.keyCode !== ENTRY_KEY) {
      return
    }
    const val = e.target.value.trim()
    e.preventDefault()

    this.setState(function (prev, props) {
      let newTodo = { id: prev.items.length + 1, title: val, completed: false, editing: false, editText: val }
      let items = prev.items
      items.push(newTodo)
      return { items: items }
    });

    e.target.value = ""
  }

  onToggle = e => {
    let id = Number(e.target.name)
    let completed = e.target.checked
    //checbox选中，
    //数据改变
    this.setState(function (prev, props) {
      prev.items.filter(item => item.id === id)
        .map(item => item.completed = completed)
      return { items: prev.items, [id]: completed }
    })
  }

  onDestroy = e => {
    let id = Number(e.target.name);
    var newItem = [];
    this.setState(function (prev, props) {
      prev.items.filter(item => item.id !== id).map(item => newItem.push(item));
      return { items: newItem };
    });
  }

  clearAllCompleted = e => {
    this.setState(function (prev, props) {
      let newItem = []
      prev.items.filter(item => !item.completed).map(item => newItem.push(item))

      return { items: newItem }
    })
  }

  onBlur = e => {
    let val = e.target.value.trim()
    let id = Number(e.target.name)
    return this.setState(function (prev, props) {
      let newItem = []
      for (let item of prev.items) {
        if (item.id === id) {
          if (val && val.length > 0) {
          newItem.push({ id: id, title: val, completed: item.completed, editing: false, editText: val })
        }
      } else {
        newItem.push(item)
      }
    }
      return { items: newItem }
  })
}

onEditChange = e => {
  let id = Number(e.target.name)
  let value = e.target.value
  this.setState(function (prev, props) {
    prev.items.filter(item => item.id === id).map(item => item.editText = value)
    return { items: prev.items }
  })
}

onEditKeyDown = e => {
  if (e.keyCode === ENTRY_KEY) {
    let val = e.target.value.trim()
    let id = Number(e.target.name)
    e.preventDefault()
    return val && val.length > 0 && this.setState(function (prev, props) {
      let newItem = []
      for (let item of prev.items) {
        if (item.id === id) {
          if (val && val.length > 0) {
            newItem.push({ id: id, title: val, completed: item.completed, editing: false, editText: val })
          }
        } else {
          newItem.push(item)
        }
      }
      console.log(newItem)
      return { items: newItem, input: null }
    })
  } else if (e.keyCode === ESCAPE_KEY) {
    let id = Number(e.target.name)
    e.preventDefault()
    return this.setState(function (prev, props) {
      let newItem = []
      for (let item of prev.items) {
        if (item.id === id) {
          newItem.push({ id: item.id, title: item.title, completed: item.completed, editing: false, editText: item.title })
        } else {
          newItem.push(item)
        }
      }
      return { items: newItem, input: null }
    })
  }
}

onAll = e => {
  this.setState({ completed: null, selected: "All" })
}

onActived = e => {
  this.setState({ completed: false, selected: "Actived" })
}

onCompleted = e => {
  this.setState({ completed: true, selected: "Completed" })
}

onDoubleClick = e => {
  let id = Number(e.target.title)
  this.setState(function (prev, props) {
    prev.items.filter(item => item.id === id).map(item => item.editing = true)
    return { items: prev.items, input: id }
  })
  // input.focus()
}

toggleAll = e => {
  this.setState(function (prev, props) {
    prev.items.map(item => item.completed = !item.completed)

    return { items: prev.items }
  })
}

componentDidUpdate = () => {
  if (this.state.input) {

    //疑难点：获取DOM元素
    let inp = document.getElementById(this.state.input + "-edit")
    let node = ReactDOM.findDOMNode(inp)
    if (node) {
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    } else {
      console.log(this.state.input)
    }
  }

}

render() {
  return (
    <section className="todoapp">
      <Header keyDown={this.newTodoKeyDown} />
      <Main
        items={filterTodo(this.state.items, this.state.completed)}
        toggleAll={this.toggleAll}
        onToggle={this.onToggle}
        onDestroy={this.onDestroy}
        onBlur={this.onBlur}
        onEditChange={this.onEditChange}
        onEditKeyDown={this.onEditKeyDown}
        onDoubleClick={this.onDoubleClick}
      />
      <Footer
        items={this.state.items}
        completed={this.state.completed}
        clearAllCompleted={this.clearAllCompleted}
        onAll={this.onAll}
        onActived={this.onActived}
        onCompleted={this.onCompleted} />
    </section>
  );
}
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
