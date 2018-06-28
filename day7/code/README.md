## 代码题

1. 请在上次作业代码题第一题重构后代码的基础上，将其改造使用 Context API 来管理数据

	使用Context API改写后代码：[condeSandbox day7-1](https://codesandbox.io/s/x9w1llznp4 "使用context api改写")

2. 请将上节课完成的[TodoList](https://fiddle.jshell.net/yyx990803/4dr2fLb7/show/light/)，改造为使用 Redux 进行状态管理。 注意：

    * **需要**使用 React-Redux 实现 Redux 与 React 连接
    * **选做**实现 Todo 内容持久化（即浏览器刷新后，TodoList 状态不丢失）
	
	**github地址：**[TODO React Redux demo](./day7-code-2 "todo react redux demo")
	说明：
	1. 设计react-redux的核心流程如下：
	   1. 设计ActionType、Actions或ActionCreator；
	   2. 依据Action设计reducer。可以使用`react-redux` 提供的`combineReducers`组织reducers；
	   3. 设计store，使用reducer初始化store，并在`index.js`中使用`react-redux`提供的`Provider`方法设置`store`
	2. TODO 中，涉及到多个组件，这些组件可以复用，只是包含的内容不同：
	   1. 输入框
	   2. 脚标
	   3. 列表
	3. **这次做的不好的地方，应该UI组件和容器分离。**
	
	> 注意点：
	1. export 组件的时候，什么时候需要`import {name} from ***`， 什么时候使用`import name from ****`:使用 `export default` 使用后者，仅使用 `export`，使用前者import
	2. reducer应该保证state是幂等操作，不带副作用，所以可以使用`...`操作和特定的。
	
3. 请将上课时演示的[代码](https://codesandbox.io/s/81rrpq9vn8)中的 `bindData(Component)` 函数改造为 `bindData(mapStateToProps)(Component)`，`mapStateToProps` 参数的含义与 `connect` 中的一致
   
   完整代码地址：[day7-code-3](https://codesandbox.io/s/pk0momw627 "day7-code-3")。
   将bindData柯里化为如下方法：
   
   ```javascript
   const bindData = mapStateToProps => Component => props => (
	   <Context.Consumer>
	   {data => <Component {...mapStateToProps(data)} {...props} />}
	   </Context.Consumer>
	   ); 
   ```
   
   其中`mapStateToProps`将状态数据绑定成组件属性。
   
   ```javascript
   const mapStateToProps = state=>{
	   return {...state}
   }
   ```
   
