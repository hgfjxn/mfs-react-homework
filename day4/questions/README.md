## 问答题

1. ES6 中的 class 其本质是 es5 声明类的方式的语法糖吗？请从原型链方面证明你的想法

	是的，证明如下：
	
	使用ES6的类声明如下：
	
	```javascript
	class Example{
		constructor(){
		this.x = 1;
		}
		
		toString(){
			return 'Example('+ this.x + ')';
		}
	}
	
	typeof Example //"function"
	Example === Example.prototype.constructor // true
	var instant = new Example();
	instant.toString === Example.prototype.toString
	```
	
	`typeof Exmaple` 是 `function`表明类的数据类型本身就是函数；
	`Example === Example.prototype.constructor`的输出结果是`true`，表明类的构造函数prototype与ES5中的构造函数表示一致。类的使用也是用`new`。
	`instant.toString === Example.prototype.toString` 结果也是 `true`， 说明ES6总类的所有方法都是建立在prototype之上的。
	
2. ES6 中的类构造函数如何声明？

	ES6中类的构造函数使用`construct`声明，例如：
	
	```javascript
	class Example{
		constructor(){
		}
	}
	```
	
3. ES6 实现类 `private` 方法有几种形式？各是什么？

	有3种形式:
	
	1. 通过命名区别
	
	   ```javascript
	   class Example{
		   foo(param){
			this._bar(param)
		   }
		   
		   _bar(param){
			return this.x = param
		   }
	   }
	   ```
	   
	2. 将私有方法移除模块外
	
	   ```javascript
	   class Example{
		   foo(param){
			bar.call(this,param)
		   }
	   }
	   
	   function bar(param){
		   return this.x = param
	   }
	   ```
	   
	3. 利用`Symbol`的唯一性
	
	   ```javascript
	   class Example{
		   foo(param){
			this[bar](param)
		   }
		   
		   [bar](param){
			this[x] = param
		   }
	   }
	   ```

4. 如何声明类的`get`，`set`方法？何时会调用`get`、`set`方法？

	在类中使用 `get`，`set`关键字；一般在拦截属性的存取行为/自定义存取操作时，调用`get`、`set`方法。
	类的`get`、`set`方法声明例子如下：
	
	```javascript
	class Example{
		constructor(){
			//...
		}
		
		get x(){
			console.log("get x done")
		}
		
		set x(value){
			console.log("set x to ${value}")
		}
	}
	```

5. 什么是类的静态方法？如何声明？如何调用？

	如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是**直接通过类来调用**，这就称为“静态方法”。
	
	例如：
	
	```javascript
	//声明
	class Example{
		static fun(){
			console.log("this is fun")
		}
	}
	
	//调用
	Example.fun()
	```

6. ES6 中如何进行继承？子类的构造函数中如何调用父类的构造函数？
   
   使用`extends`关键字表示继承，，使用`super`函数调用父类构造函数。例如：
   
   ```javascript
   class Shape{
	   constructor(name){
		this.name = name
	   }
   }
   
   class Square extends Shape{
	   constructor(length){
		super('Square')
		this.length = length
	   }
   }
   ```

7. ES6 的模块中如何导入导出变量？

	ES6中通过 `import` 和 `export` 关键字实现导入和导出变量和函数。
	例如：
	
	```javascript
	//point.js
	var x = 1
	var y = 3
	
	export {x, y}
	```
	
	在另一个js文件中，可以使用 `import`关键字引入：
	
	```javascript
	import {x, y} from './point.js'
	```

8. ES6 的模块 `export default` 和 `export` 有何异同？

	`export default` 和 `export`都是将内部变量或者函数导出。
	但是，使用`export`导出的函数或者变量，在`import`时，需要准确的知道导出的函数名和变量名；
	使用 `export default`导出，在`import`时，可以根据需要定义不同的名字，方便快速上手；

9. 修饰器（Decorator）是什么？如何使用？
   
   修饰器是一个对类进行处理的函数，装饰器主要用来修改类的行为。
   
   使用：
   
   1. 一般先定义修饰器函数，修饰器的第一个参数一般是类的原型对象；
   2. 在类声明中使用注解
   
   例如：
   
   ```javascript
   function flag(param){
	   return function(target){
		target.flag = param
	   }
   }
   
   @flag(true)
   class Example{
	   
   }
   
   console.log(Example.flag) //true
   ```

10. 为什么全局函数不支持使用修饰器？如果想使用类似功能应该用怎样的替代实现？

	因为全局函数存在函数提升所以修饰器不能用于函数。如果想使用类似功能，应该高阶函数的形式，直接执行。
	
	例如：
	
	```javascript
	function doSomething(name) {
		console.log('Hello, ' + name);
	}
	
	function loggingDecorator(wrapped) {
		return function() {
			console.log('Starting');
			const result = wrapped.apply(this, arguments);
			console.log('Finished');
			return result;
		}
	}
	
	const wrapped = loggingDecorator(doSomething);
	```

	使用高阶函数，在修饰的函数前后执行特定的操作。
