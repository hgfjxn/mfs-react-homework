## 问答题

1. React 有哪些生命周期函数？他们的调用顺序是怎么样的？

    	React 的生命周期函数有：
    	
    	- `getDefaultProps()`
    	- `getInitialState()`
    	- `componentWillMount()`
    	- `componentDidMount()`
    	- `componentWillUnmount()`
    	- `componentDidUnmount()`
    	- `componentWillReceiveProps()`
    	- `shouldcomponentupdate()`
    	- `componentWillUpdate()`
    	- `componentDidUpdate()`
    	
    	调用顺序和关系入下图：
    
    ```
         ┌───────────────────┐                                   
         │ getDefaultProps() │                                   
         └───────────────────┘                                   
                   │                                             
                   │                                             
                   ▼                                             
         ┌───────────────────┐                                   
         │ getInitialState() │                                   
         └───────────────────┘                                   
                   │                                             
                   │                                             
                   ▼                                             
        ┌─────────────────────┐                                  
        │componentWillMount() │                                  
        └─────────────────────┘                                  
                   │                                             
                   │                                             
                   ▼                                             
        ┌─────────────────────┐                                  
        │ componentDidMount() │                                  
        └─────────────────────┘                                  
                   │                                             
                   │                                             
                   ▼                                             
                .─────.         ┌────────────┐                   
    ┌─────────▶(Running)────────┤props update├────┐              
    │           `─────'         └────────────┘    │              
    │              │                              ▼              
    │┌──┐          │                ┌───────────────────────────┐
    ││NO│          │                │componentWillReceiveProps()│
    │└──┘          ▼                └───────────────────────────┘
    │  ┌───────────────────────┐                  │              
    ├──│shouldcomponentupdate()│◀─────────────────┘              
    │  └───────────────────────┘                                 
    │              │                                             
    │              │┌────┐                                       
    │              ││YES │                                       
    │              ▼└────┘                                       
    │  ┌───────────────────────┐                                 
    │  │ componentWillUpdate() │                                 
    │  └───────────────────────┘                                 
    │              │                                             
    │              │ ┌─────────┐                                 
    │              │ │render() │                                 
    │              ▼ └─────────┘                                 
    │  ┌───────────────────────┐                                 
    └──│ componentDidUpdate()  │                                 
       └───────────────────────┘                                 
    ```

2. 我们如何利用 `shouldComponentUpdate` 进行性能优化？

    一般在我们能确定不需要更新组件时，但是react会默认帮助更新组件时，可以使用`shouldComponentUpdate` 进行性能优化。例如父组件的state更新时，默认会更新子组件，如果子组件没有必要更新，可以通过改写`shouldComponentUpdate` 优化。

3. React 中一般如何处理表单？请给出 Demo

    一般使用form标签表示表单组件；input 来添加输入框；textarea 添加多行输入框；select添加选择控件；通过添加`onChange`方法，捕捉控件变动事件。通过form标签的`onSubmit`事件，捕获表单提交事件，具体的使用demo如下（[demo codeSandbox地址](https://codesandbox.io/s/zro11y25ll)）：
    
    ```javascript
    import React, {Component} from "react";
    import ReactDOM from "react-dom";
    
    import "./styles.css";
    
    class App extends Component {
      state = {
        name: "",
        password: "",
        gender: "Not Sure",
        info: ""
      }
      handleName = e => { this.setState({ name: e.target.value }) }
      handlePassword = e => { this.setState({ password: e.target.value }) }
      handleGender = e => { this.setState({ gender: e.target.value }) }
      handleInfo = e => { this.setState({ info: e.target.value }) }
      handleSubmit = e => { e.preventDefault(); console.log(this.state) }
      render() {
        return (
          <div>
            <h1>name: {this.state.name}; password: {this.state.password}; gender:{this.state.gender}; info: {this.state.info}</h1>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label>Name:
                                <input type="text" name="name" onChange={this.handleName}></input>
                </label>
              </div>
              <div>
                <label>Password:
                                <input type="password" name="password" onChange={this.handlePassword}></input>
                </label>
              </div>
              <div>
                <label>
                  Gender:
                                    <select onChange={this.handleGender} value={this.state.gender}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Not Sure">Not Sure</option>
                  </select>
                </label>
              </div>
              <div>
                <label>Info:
                                    <textarea onChange={this.handleInfo}></textarea>
                </label>
              </div>
              <input type="submit" value="Submit"></input>
            </form>
          </div>
        )
      }
    }
    
    const rootElement = document.getElementById("root");
    ReactDOM.render(<App />, rootElement);
    ```

4. 什么是状态提升？为什么在实践中我们需要进行状态提升？

    将各个子组件状态保存在祖先组件中的方法就是状态提升。因为同一个对象需要几个不同的组件来处理和展示，所以应该遵循“单一数据源“原则，方便统一管理和共享状态，而不是陷入不同的组件中同步状态的问题。

5. 如何实现组件联动？请给出 Demo

    基于状态提升，可以实现组件联动，代码同第三题，[demo codeSandbox地址](https://codesandbox.io/s/zro11y25ll)。第一个div展示的数据和表单控件联动。
    

6. 实践中父子组件嵌套会很深，状态提升数据逐级传递麻烦而且易出错，怎么办？

    可以使用react context api 或者 redux 组件间的状态同步和数据共享。

