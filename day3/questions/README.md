# 问答题

1. Symbol 是什么？有哪些使用场景？
   `Symbol`是ES6中一种新的数据类型，表示独一无二的值。
   使用场景：
   1. 它可以用来表示对象的属性名。在扩展对象的功能时，从根本上防止属性名的冲突。
   2. 表示一组常量。
   3. 消除魔术字符串
   4. 为对象定义非私有的内部方法。
   5. 实现单例模式

2. `Symbol("foo") == Symbol("foo")`输出什么？为什么？

	输出 `false`，因为`Symbol()`每次返回独一无二的值， `Symbol("foo")`只是定义了Symbol实例的**描述**是相同的，但是调用了两次，实际是生成了两个不同值的Symbol实例。

3. `Symbol.iterator` 是什么？这里为什么要使用 `Symbol` 那？
   
   `Symbol.iterator` 是内置的Symbol值，指对象的默认遍历器方法;使用 `Symbol` 是为了表示对象的默认遍历器方法是唯一的指向唯一。

4. 数组解构的核心本质是什么？哪些对象（容器）可以作为数组解构的右值？（此题请自学完成）

	数组解构的核心本质是数组具有迭代器。可作为数组解构的右值的容器有：`Array`系列， `Set` , `Map`。
	
5. Promsie 对象有几种状态？他们之间是怎么转换的？

	Promise对象有三种状态，分别是 `pending`, `fulfilled`, `rejected`;
	状态转换只有一下两种情况：
	1. pending -> fulfilled
	2. pending -> rejected
	
6. 下面代码的输出结果是什么？为什么？（**饿了么面试题**）

    ```
     setTimeout(function() {
         console.log(1)
     }, 0);
     new Promise(function executor(resolve) {
         console.log(2);
         for( var i=0 ; i<10000 ; i++ ) {
             i == 9999 && resolve();
         }
         console.log(3);
     }).then(function() {
         console.log(4);
     });
     console.log(5);

    ```
	
	输出结果：
	
	```
	2
	3
	5
	4
	1
	```
	
	原因：
	1. 所有主线程上的程序顺序是`setTimeout` -> `new Promise(...)` ->`console.log(5)`，但是`setTimeout`函数的回调函数是主线程执行完成后,有空闲时间才会调用;
	2. 执行`new Promise(...)`，会立即执行回调函数，所以先打印2，，并进入循环，循环到满足i==9999条件后，会执行resolve，promise进入fulfilled状态，打印3后返回，异步等待回调`then`；主线程执行`console.log(5)`打印5；此时还有任务then的回调方法没有执行，所以先执行then的回调函数，打印4；然后立即执行执行`setTimeout`的回调函数，打印1；。

    > 参考[javascript运行机制：再谈Eventloop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)分析 `setTimeout`的运行时机。

7. 什么是 Promise 对象？引入 Promise 对象是为了解决什么？

	Promise对象，保存着某个未来才会结束的事件（一步操作）的结果；
	为了解决：Promise 是一种异步编程的解决方案，可以讲异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数；还提供了统一的接口，使得异步操作更加容易。
	
8. `Promise.all` 和 `Promise.race` 的区别是什么？（此题请自学完成）

	`Promise.all` 和 `Promise.race` 都是将多个 `Promise`实例包装成一个新的`Promise`实例，他们的区别是：
	
	- `Promise.all`只有传入的多个`Promise`实例状态**全部**为 `fulfilled` （即全部执行完成）或者其中一个`Promise`实例状态变为 `rejected`，包装后的`Promise`实例状态才会改变，并会执行包装后的`Promise`实例回调函数。如果传入的多个`Promise`实例状态全部为 `fulfilled`，那么包装后的Promise实例 的回调函数的参数是多个Promise实例的结果，且按Promise传入顺序返回。
	- `Promise.race`在传入的多个`Promise`实例状态**有一个**为 `fulfilled`或者有一个为`rejected`时（即只有一个promise实例的状态发生改变），就会返回，并且包装后的`Promise`实例的状态也会改变，并将率先改变状态的`Promise`实例返回值作为包装后的`Promise`实例回调函数的参数。

9. Promise 中抛出未处理的异常会怎么样？会阻碍后面的代码执行吗？Chrome 和 Node.js 环境下有什么不同？

	Promise中抛出未处理的异常不会抛出到外层代码，不会影响后面代码的执行。Node.js可以通过 `unhandledRejection`来监听未捕获的 `rejected`错误。例如：
	
	```javascript
	process.on('unhandledRejection', function(err, p){...});
	```
	
	> 为了测试不同的表现，我在浏览器上面测试了一下，测试代码：
	> 
	> ```javascript
	> new Promise(function(resolve, reject){setTimeout(function(){reject( new Error("eee"))},2000)}).then((val)=> console.log("val:"+val)); console.log("x");setTimeout(function(){console.log("222")}, 3000);
	> ```
	>
	> 输出的时候会多一行输出，如图：![疑问1](./疑问1.png "疑问")。**为什么会多一行数字？**

10. `Promise.catch` 方法中再抛出异常会怎么样，需要怎样捕捉？

	`Promise.catch`方法中再抛出异常也不会传递到外层，不会影响外层的运行；需要在前一个`catch` 方法后添加一`个catch`方法来捕获前一个catch的异常。

11. `then` 的**链式调用**每次返回的是同一个 Promise 对象吗？请写一小段代码证明你的观点

	每次返回的都不是同一个Promise对象。证明程序：
	
	```javascript
	const x = new Promise(function(resolve, reject){resolve()})
	const y = x.then()
	const z = x.then().then()
	y==z       //false
	```
	

12. 什么是 Generator 函数？和普通函数有什么区别？怎么声明 Generator 函数？

	 Generator 函数是一个生成器函数，一个状态机，封装了多个内部状态。执行Generator函数会返回遍历器对象，可以一次遍历Generator函数的每一个内部状态。
	 
	 从形式上Generator 函数和普通函数的区别是：
	 
	 1. Generator 函数的function关键字与函数名之间多了一个星号；
	 2. 函数体内部使用`yield`表达式，定义不同的内部状态；
	 
	 调用后，普通函数返回的是函数执行的结果，Generator 函数体并不立即执行完，返回的也不是函数运行的结果，而是一个指向内部状态的指针对象，即迭代器，需要使用next方法取出产生的数据。
	 
	 声明Generator函数，需要在function关键字与函数名之间多了一个星号，切函数体内部使用`yield`表达式。例如：
	 
	 ```javascript
	 function* gen(){
	   yeild "hello"
	   yeild "world"
	   return "ending"
	 }
	 ```
	
13. 怎样调用 Generator 函数并逐步执行 Generator 代码？

	调用Generator 函数和普通函数是一样的方式，但是返回的结果是一个迭代器，需要调用迭代器的next方法取出封装好的数据对象。
	
	例如取出第12题中的结果：
	
	```javascript
	let it = gen()
	it.next()//结果是{value: "hello", done: false}，其中value属性的值就是生成的结果，done表示是否取完	
	```
	
14. Generator 函数实现无限序列原理是什么？

	1. Generator函数内部并没有存储所有的生成的数据，只是保存了内部的状态，在生成数据时，根据当前的状态生成下个状态。
	2. 执行 `yeild`表达式后，会移交执行权限，generator函数会暂停执行，并将yield 后的表达式的结果作为返回对象的`value`。
	3. 每次调用 `next`后，内部状态由一个状态（或初始状态）往下执行，变为另一个内部状态，知道遇到`yield`表达式。
	
15. Generator 函数怎么实现函数内的数据与函数外进行交互的？请从函数内数据传至函数外，和函数外数据传至函数内 两个方面说明

	- 函数内数据传到函数外：
	  - 函数外部调用`next`方法获取generator函数产生的数据，每次调用返回一个数据；函数内的数据通过yeild 将数据作为Generator函数返回对象的`value`传到函数外，并且返回对象还提供属性 `done`来判断是否由下一个值。
	  - 具体的原理是：执行`next`方法时， Generator函数上下文加入到堆栈（此时，堆栈中的位置：外部函数位于Generator函数的下面），执行内部代码，执行的上下文环境遇到 `yield`时，就会暂时退出堆栈，切内部状态会冻结，外部函数继续执行；
	- 函数外数据传到函数内： 
	  - `yield`表达式本身没有返回值，或者说总是返回`undefined`。next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值，传到了函数内部。
	  - 具体原理是：执行带参数`next`方法时，会将Generator函数冻结部分入栈，`next`方法带的参数再入栈，接着执行时，堆栈会后进先出，一次向下继续执行Generator函数，知道再次碰到ueild或者函数执行完。

16. `yield*` 有什么用？它和 `yield` 有什么关系？（此题请自学完成）

	`yield*`表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。从语法的角度，如果`yield`表达式后面跟的是一个遍历器对象，需要在`yield`表达式后面加上星号，表明它返回的是一个遍历器对象。
	 `yield*`可以用作在一个Generator函数中执行另一个Generator函数，外层Generator函数调用next方法时，`yield*`会执行内层Generator函数，此时内层Generator函数会执行到`yield`表达式，外层Generator函数会获取内层Generator函数的值。
	 `yield*`与`yield`
	 - 相同点：配合Generator函数使用；
	 - 区别：
	   1. `yield`是关键字，后面跟的是表达式或者值，并在next调用时返回它； `yield*`是表达式，后面跟的是迭代器对象，并在next调用时返回迭代器对象的元素。
	   2. `yield`用作Generator内外部函数的数据交换，`yield*`在一个Generator函数调用另一个Generator函数；
	 
	
17. 怎么迭代出 Generator 函数所有值？请使用 **for of 循环**实现

	```javascript
	//gen()表示generator函数
	for (let x of gen()){
		console.log(x);
	}
	```
	
	
18. 为什么要使用 Generator 函数 或者 async/await 进行异步控制流，对比 callback 和 Promise 方案，主要解决了什么问题？
	
	Generator函数和 async/await 进行异步控制流，可以使用类似同步控制的表达方式，更好的写出异步控制程序，简单明了。
	主要解决了：在多次异步操作时，下次的操作一来上次的结果，传统的方法一般需要嵌套使用（callback）或者有大量的代码冗余（promise），不便于阅读和理解。

19. Generator 函数为什么能实现异步控制流？其原理是什么？

	Generator函数可以暂停执行和恢复执行，并且能实现函数体内外的数据交换和错误处理机制；其原理如下：
	1. 在Generator函数外部可以通过next恢复执行Generator函数，并从外部函数传入参数；
	2. Generator可以通过 `yield`关键字暂停执行，让出执行权限并返回数据到外部函数；
	3. Generator函数可以使用 `throw`方法，捕获外部函数抛出的异常
	
20. 什么是 Thunk 函数？为什么使用 Thunk 函数可以通过和 Generator 函数配合实现异步控制流？(此题请自学完成)

	在编译器的传名调用实现中，一般将参数放到临时函数中，再将临时函数传入到函数体，这个临时函数就是`Thunk`函数。`Thunk`函数将多参数函数转为只接受 回调函数 作为参数的函数。
	
	由于`Thunk`函数接受回调函数，则可以在异步操作完成后，调用回调函数，此时回调函数的核心是Generator 函数，即将程序的执行权交给Generator 函数，generator函数通过 `yield` Thunk函数，将执行权再次交给 Thunck函数，使用next方法交换数据，实现了函数的异步控制流。这样我们在写异步程序时，就可以使用类似同步程序的表达方式书写，并能得到异步操作的实际效果。
    例如：
	
	```javascript
	let fs = require('fs')
	let thunkify = require('thunkify')
	let readFileThunk = thunkify(fs.readFile)
	
	let gen = function* (){
		let r = yield readFileThunk('/etc/fstab')
		console.log(r.toString())
		let rd = yield readFileThunk('/etc/shells')
		console.log(rd.toString())
	}
	
	function run(generator){
		let g = generator()
		
		function next(err, data) {
			let re = g.next(data)
			if(re.done)return
			re.value(next)
		}
		
		next()
	}

	```

21. 使用 Promise 可以配合 Generator 函数实现异步控制流吗？具体原理是什么？

	可以，Generator函数是一个异步的操作容器，为了实现自动的流程管理，需要在异步操作有结果后，能自动将执行权限交回给Generator函数，形成执行权限转移和数据交互的环路。从而实现异步控制流。Promise对象可以通过在then方法中将数据和执行权限交回给Generator函数。
	具体过程：
	1. 将异步操作封装在Promise中，
	2. Generator函数 yield Promise封装的异步函数；
	3. 在实现异步函数控制流的时候，使用 Generator yield 的 Promise对象的 then 方法交回执行权行
	
22. 真正发出异步操作指令是在 Generator 函数外还是在 Generator 函数内？（HINT: 基于 Thunk 函数和基于 Promise 两种 Generator 函数异步控制流，情况不一样）

	- 基于Thunk的Generator函数异步控制流，真正异步操作指令在Generator函数外：在Generator函数内部会调用Thunk函数，Thunk函数被调用后，本质上返回的是一个接受  **参数为回调函数的** 函数，所以在Generator函数外执行。
	- 基于Promise的函数的Generator函数异步控制流，真正发出异步操作指令在Generator函数内：在Generator函数内部会生成Promise对象，Promise对象会立即执行回调函数，发出异步指令。
	
23. async 函数是什么？它和 Generator 函数有什么关系？

	async函数实现了Generator相同的功能，是Genreator函数的语法糖，在书写形式上async函数就是将Generator函数的星号（`*`）替换成了`async`，将`yield` 替换成了`await`。
	但是，async函数有一下几点的改进：
	1. async函数内置执行器，不需要像Generator函数 需要使用`co`模块，可以像普通函数一样执行；
	2. 更清晰的语义；
	3. 适用性更广： `co`模块约定，`yield`模块后只能是Thunk函数或者Promise 对象，而async函数的await后面，可以是Promise对象和原始类型的值。
	4. 返回值是Promise，方便操作。
	
	> `async`函数可以看作多个异步操作，包装成的一个 Promise 对象，而`await`命令就是内部`then`命令的语法糖。


24. 在全局域或者普通函数中能使用 await 或 yield 关键字吗？为什么？

	都不能使用。yield关键字仅能在Generator函数中使用，否则编译器报错；await关键字也仅能在async函数中使用，否则编译器报错。

25. 直接调用 `async` 函数的返回值类型是什么？为什么？

	直接调用async函数的返回值是Promise类型的，因为不管async函数内部返回的数据类型是什么，async函数都会将多个异步操作操作结果包装成Promise对象返回，并且该Promise对象的状态变化必须等到async函数内部所有await后的Promise对象执行完后，或者遇到return语句或者抛出错误。

26. 下面代码能正常捕获异步异常吗？为什么？如果不能需要怎样修改才可以正常捕获异常？

    ```
     async function f() {
         throw new Error('出错了');
     }
     try{
         f()
     }catch(e){
         console.log(e)
     }
    ```
	
	不能，因为try catch和异常在不同的作用域，所以无法捕获异常。async返回的是一个Promise对象，在其中throw异常时，会将Error作为reject的reason，所以此时Promise对象的异常都是通过调用Promise对象的函数（函数的参数中包含抛出的异常）处理的，可以使用then或者catch处理异常。
	
	正确的捕获方式：
	
	```javascript
	async function f() {
         throw new Error('出错了');
     }
	 
	 f().catch(e=>{
		console.log(e)
	})
	```

