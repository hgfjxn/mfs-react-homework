1. JSX中以下代码编译到 ES5 的结果是什么？

    ```
     <h1>Hello, world!</h1>

    ```
	
	ES5结果是：
	
	```javascript
	React.createELement({
		"h1",
		null,
		"Hello, world!"
	})
	```
	
2. 我们自己实现的 `Component` 中的 `render` 方法的返回值是 HTML 文档吗？如果不是 HTML 文档，那是什么？

	render方法返回的不是 HTML 文档，而是React的Component。render方法主要是更新虚拟DOM。

3. 如何让一个 component 绑定一个动态属性？请给出 demo 代码，并解释

	一个component绑定动态属性可通过花括号取变量的值。例如：
	
	```javascript
	<div title={this.props.title}></div>
	```

4. 使用 `function` 声明的组件和使用 `class` 声明的组件有何异同？

	- 相同点：
		+ 都是声明组件，可独立设计和服用的组件。
	- 不同点：
		+ `function`声明的组件，
		  - 代码的可读性更好，只有render 函数，更简洁；
		  - 不需要实例化，整体的渲染性能更好；
		  - 但是无法访问`this`中的对象；
		  - 只能输入props对象并且同样的props可以得到相同的渲染结果；
		  - 不能访问react生命周期方法；
		+ `class`声明的组件：
		  - 可以访问react生命周期的方法；
		  - 需要实例化；
		  - 可以保存组建状态；
		  - 可以访问`this`中的对象；

5. 在 JSX 中如何表示循环和分支逻辑？请给出 demo 代码，并解释

	使用`map`表示for循环，使用逻辑运算符表示分支逻辑。
	
	循环逻辑:
	
	```javascript
	const ele = [1,2,3].map(i => (<h1 name={i}>{i}</h1>))
  	ReactDOM.render(
		<div>
			{ele}
		</div>
		, document.getElementById('root')
	)
	```
	
	分支逻辑:
	
	```javascript
	const ele = flag && <h1>element</h1>
	ReactDOM.render(
		ele,
		document.getElementById('root')
	)
	```
	
6. 什么是模型（数据）决定视图？请用一公式表示，并给出相应的解释

    模型（数据）决定视图就是当模型（数据）发生变化时，视图才会发生变化；
    用 $view = f(model)$表示，即只通过模型（数据）来决定视图，而不是直接操作DOM。
	
7. 当视图更新时，React 会重新渲染全部的 dom 吗？如果不会，React 怎么更新 dom？使用的算法是什么？复杂度是多少？

	试图更新时，React只会渲染部分变动的dom。React使用局部更新dom。使用diff算法，实现了复杂度为$O(n)$的算法。
	
	算法的前提假设：
	
	1. `不同类型`的两个元素将产生不同的树。
	2. 开发人员可以在不同渲染之间使用`key`属性来表示哪些子元素是稳定的。
	
	算法的思想是：
	
	1. 比较根元素，根元素不同，那么行为肯定也不同，需要更新。
	   1. 不同类型的DOM元素。React会删除旧树，从头创建DOM树。
	   2. 相同类型的DOM元素，比较元素的属性，保留底层的DOM节点，更新变动的属性。
	2. 递归比较子节点，子元素通过比较两元素list的区别（有序的比较），更新。支持用key属性表示元素稳定性（只需要在兄弟节点中唯一即可，不需要全局唯一）

8. 如何指定组件的初始状态（state）？如何更新组件状态？请给出 demo 代码，并解释

	直接在状态声明的时候，给上初始值，设置初始状态；
	使用`setState`方法更新组建状态。
	
	demo如下：
	
	```javascript
	import React,{Component} from 'react';
	import ReactDOM from 'react-dom';
	import App from './App.js'
	import './index.css';
	import registerServiceWorker from './registerServiceWorker';

	class Comp extends Component{

		constructor(){
			super()
			//初始化状态
			this.state = {
				name: "john",
				age: 10
			}
			//状态更新方法，其中e是触发事件
			this.grow = (e) => {
				this.setState({age: 11});
			}
		}
  
      render(){
		  return (
	   		  <div>
				  <button onClick={this.grow}> {this.state.name}</button>
				  <h3>{this.state.age}</h3>
			  </div>
		  )
	  }
	}

	ReactDOM.render(<Comp />, document.getElementById('root'));
	```

9. 直接使用 `this.state.xxx` 修改组件状态视图会更新吗？为什么？

	直接使用`this.state.xxx`修改组件状态视图不会更新。
	因为直接修改`this.state.xxx`，只是修改了属性的值，不会重新render，不会更新视图。

10. state(状态) 更新可能是异步的，会带来哪些问题？如何解决这些问题？

	可能会造成更新不符合预期的情况。例如：多次 `+1`的更新可能会被React优化合并成一次操作，最终只会加1.
	可以通过使用 `setState(prev, props)`来解决，这里的`prev`表示操作前的state对象。

11. 如何让数据在组件树里从上向下流动？从下向上流动又该如何实现哪？请给出 demo 代码，并解释

	使用组件内部状态，如state，props，自组建从父组件获取数据，将数据在组件中从上向下流动；
	使用props中的函数，即父组件将函数包含在props中，自组建调用父组件的函数，实现从下向上流动。
	
	从上向下流动：通过state和props，将父组件的状态传入到子组件。
	
	```javascript
	import React, { Component } from 'react';
	import './App.css';

	function DateDiv(props){
		return <div className="App"><h1>{props.date.toLocaleTimeString()}</h1></div>
	}

	class App extends Component {
		state = {date: new Date()}

		componentWillUnmount(){
			clearInterval(this.timeID)
		}
	
		componentDidMount(){
			this.timeID = setInterval(
				()=> this.tick(), 1000
			)
		}
	
		tick = ()=> {this.setState({date: new Date()})}
	
		render() {
			return (
				<DateDiv date={this.state.date} />
			);
		}
	}
	```
	
	从下网上流动：通过调用父组件的 `handleInput`方法，将输入的数据传入父组件。
	
	```javascript
	import React, { Component } from 'react';
	import './App.css';

	function DateDiv(props){
		return (
			<label>Name: 
			<input onChange={props.handle} value= {props.name}></input>
			</label>
		)
	}

	class App extends Component {
		state = {name: ""}

		handleInput = (e)=>{
			this.setState({name: e.target.value})
		}

		render() {
			return (
				<div className="name">
					<DateDiv name={this.state.name} handle = {this.handleInput}/>
					<h1>Hello {this.state.name}!</h1>
				</div>
			);
	   	}
	}
	```


