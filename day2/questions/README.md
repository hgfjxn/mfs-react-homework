1. babel 是什么，我们为什么要使用 babel？

babel是一款ES6及后续ECMAScript规范的转码器，可以讲ES6转码为ES5，从而在现有的环境中运行。
为什么要使用babel？
因为现在的浏览器对ES6的支持程度有所不同，用户使用的浏览器的版本也不同，为了尽可能的兼容ES5，我们需要babel将ES6的代码转为ES5代码，在更为广泛的运行环境中运行。 babel提供方便的转码功能，让我们可以使用ES6编码，而不用担心运行环境是否支持。

2. 我们使用 babel 把 es6 的代码编译为 es5代码后，为什么还需要引入 polyfill？

babel是针对ES6句法转为ES5的转码器，不转换新的API，例如 `Iterator`， `Generator`等，所以我们需要polyfill实现将ES6的新API运行在ES5的环境中。

3. 如下代码输出是什么？为什么？请写出js解释器实际执行的等效代码

```javascript
var v='Hello World'
(function(){
 console.log(v)
 var v='I love you'
})()
```

代码输出为 `undifined`, 因为 `var`会变量提升，**变量声明** 提升到当前代码块(变量所处的 `{}` )的最上面，实际执行的等小代码如下：

```javascript
var v='Hello World'
(function(){
 var v
 console.log(v)
 v='I love you'
})()
```

4. 如下代码输出是什么？为什么？请写出js解释器实际执行的等效代码

```javascript
function main(){ 
 console.log(foo)      // ?
 var foo = 10
 console.log(foo)      // ?
 function foo(){ 
   console.log("我来自 foo")
 }
 console.log(foo)      // ?
}
main()
```

代码会输出：

```
[Function: foo]
10
10
```

ES5的函数声明只能是顶级作用域或者函数作用域，不允许在块级作用域声明，但是浏览器为了兼容旧代码，浏览器实现时没有遵守这个约定，并且函数在块级作用域声明会提升声明。在ES6中，块级作用域声明的函数类似于 `let`声明的变量，会被限制在块级作用域，但是浏览器也可以不遵守这个规定而有自己的行为方式。

所以最终，**实际实现**的ES6环境中：

- 允许在块级作用域中声明函数
- 函数声明类似于 `var`，会提升到全局作用域或者函数作用域的头部
- 同时，函数声明还会提升到所在块级作用域的头部


本代码中，函数声明会被提升到函数作用域的头部，然后再打印。最终执行的等效代码：

```javascript
function main(){ 
 function foo(){ 
   console.log("我来自 foo")
 }
 console.log(foo)      // ?
 var foo = 10
 console.log(foo)      // ?
 console.log(foo)      // ?
}
main()
```

5. 如下代码输出是什么？为什么？请写出js解释器实际执行的等效代码

```javascript
var a = 10;
function main(){
 console.log(a);        // ?
 var a = 20;
 console.log(a);        // ?
 (function(){
   console.log(a);     // ?
   var a = 30;
   console.log(a);     // ?
 })()
 console.log(a);        // ?
}
main()
```

代码的输出是：

```
undifined
20
undifined
30
20
```

首先`main()`方法中，包含一个立即函数，而不是函数声明，所以不会提升。而 `var`变量声明会提升。此处立即函数外是变量声明提升的语法；立即函数内，也是。


> 匿名函数、立即函数、函数声明、函数表达式的区别：
> 
> 1. 匿名函数：`function(){}`没有具体的函数名。
> 2. 立即函数：一般类似`(function(){})()`实现闭包，函数会有独立的运行空间。
> 3. 函数声明：`function functionName(){...}`声明一个函数，有具体的函数名和函数体
> 4. 函数表达式：`var funcationName=funcation(){...}` 将匿名函数赋值给一个变量。


等效代码如下：

```javascript
var a = 10;
function main(){
 var a;
 console.log(a);        // ?
 a = 20;
 console.log(a);        // ?
 (function(){
   var a;
   console.log(a);     // ?
   a = 30;
   console.log(a);     // ?
 })()
 console.log(a);        // ?
}
main()
```


6. 为什么点击所有的button打印出来的都是5而非0,1,2,3,4？要怎么修改？

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>JS Bin</title>
<script src="https://code.jquery.com/jquery-3.1.0.js"></script>
</head>
<body>
<ul>
 <li><button>0</button></li>
 <li><button>1</button></li>
 <li><button>2</button></li>
 <li><button>3</button></li>
 <li><button>4</button></li>
</ul>
<script>
var buttons = $("button")
for(var i=0;i<buttons.length;i++){
 buttons[i].onclick = function(){
   console.log(i)
 }
}
</script>
</body>
</html>
```

因为此处变量 `i`是 `var`声明的，为全局有效。加载此html后，直接运行 `for`循环，跳出循环时， `i=5`；循环内部给button绑定的click事件打印的 `i`是全局的，所以输出一直是 `5`。由代码可知，此代码的运行环境应该是支持ES5的浏览器环境，所以将for循环中，button事件绑定为立即执行函数即可。

`<script>`改成如下内容即可：

```javascript
var buttons = $("button")
for(var i=0;i<buttons.length;i++){
 buttons[i].onclick = (function(){
   console.log(i)
 })()
}
```



7. 什么是解构？数组解构是什么？

使用一定的模式，从对象和数组中提取值，并赋值给变量，这被称为解构，例如 `let [a,b,c] = [1,2,3]`将数组`[1,2,3]`的元素，一次赋值给 `a,b,c`。解构支持部分解构，不完全解构的顺序是从左往右。

数据结构是将数组中的每个元素从左到右迭代的赋值给对应变量数组的每个元素，可以支持部分解构。不支持迭代（即数据解构具有`Iterator`接口）的对象和数据结构，不能解构。

8. 什么是解构默认值？怎样使用？

解构时，允许设置默认值，当解构是，**数组中的元素没有值，或者值**严格等于** `undifined`，那么默认值就会生效。**

一般直接在解构时使用 `=`给变量赋值即可，例如 `let [a=1,b=2] = [34,56]`。也可以在解构的时候使用变量作为默认值，但是变量必须先声明。例如： `let [x=1, y=x] = [3]`，解构的结果是 `x=3, y=3`，但是如果默认值没有提前声明就会报错，例如 `let [x=y, y=1] = [3]`会报错。

9. 下面代码执行会报错吗？为什么？

```javascript
let foo;
let {foo} = {foo: 1}
```

会报错，因为变量 `foo`被重复声明了两次，使用 `let`重复声明变量会报错。

10. 下面代码执行结果是什么？会报错吗？

```javascript
const {"0": a,"1": b} = ["foo", "bar"];
```

执行结果是

```
undifined
```

不会报错，正常解构。


11. 下面代码声明了几个变量？值是多少？

```javascript
let { a: { b: { c }}} = { a: { b: { c: "1",d: "2"}}}
```

声明了1个变量 `c`，值是 `1`。

因为

```javascript
let { a: { b: { c }}} = { a: { b: { c: "1",d: "2"}}}
```

等效于：

```javascript
let { c } = { c: "1",d: "2"}
```

> 对象的解构与顺序无关，属性名决定了解构的对应关系。数组是变量的顺序相关的。
> 对象的解构赋值的内部机制，是**先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者，前者只是对应关系的模式。**
> 解构的模式是嵌套对象，子对象的父属性不存在，就会报错。例如 `let {foo: {bar}} = {baz: 'baz'};`
> 对象支持属性名解构，即解构时，=号左侧对象， `:`左边是属性名， `:`右侧是变量名，变量的值是=号右侧对象的属性。
> 赋值语句的非模式部分，可以使用圆括号。例如 `({ p: (d) } = {}); ` 其中 `p`是模式不能使用括号，`d`是非模式部分，可以使用括号。

12. 数组解构的核心是什么？请自学 Generator 函数 回答下面代码返回什么

```javascript
function* count() {
let i = 1
while (true) {
  yield i++;
}
}
let [first, second, third, fourth, fifth, sixth] = count();
```

数组解构的核心是**迭代**=号右侧数组中的元素，并赋值给对应位置的变量。

代码执行后，变量赋值情况：

```
first=1, second=2, third=3, fourth=4, fifth=5, sixth=6
```


13. 字符串可以解构吗？结合下面代码说说为什么？

```javascript
const [a, b, c, d, e] = 'hello';
```

字符串可以解构，字符串在内存中可以认为是一个字符数组，数组是可以解构的。例如字符串 `"hello"`可以看作是数组 `['h','e','l','l','o']`，所以解构后，变量的值是： `a='h',b='e',c='l',d='l',e='o'`。

14. 什么是箭头函数？它和 function 声明的函数有什么区别？


箭头函数是一种函数式定义函数的方法，用`=>`定义函数。 其中`=>`左侧使用 `(...)`表示参数，右侧是函数体。

箭头函数与function声明的函数有什么区别：

1. 函数的表达形式更简洁，包括单个函数声明和嵌套函数声明。
2. this指向不同。function定义的函数，this指向随着运行环境变化，是使用时的对象；而箭头函数指向固定不变，一直是定义时所在的对象。
3. 变量提升。使用function定义的函数会自动提升，所以函数的调用可以在函数的声明前，但是箭头函数的声明一定在使用前。
4. function定义的函数可以用于构造函数
5. 箭头函数不可以使用 `arguments`对象，function函数可以。
6. 不可以使用 `yield`命令，所以箭头函数不能作为 `Generator`函数。


15. 下面代码输出的是什么？为什么？

```javascript
var a = 2
var obj = {
 a : 1,
 fun : function () {
  console.log(this.a)
 }
}
var obj2 ={
 a : 3
}
obj.fun()          // ?
var fun = obj.fun;
fun()              // ?
obj2.fun = obj.fun
obj2.fun()         // ?
```

输出的是：

```javascript
1 //object内部的函数
2 //全局作用域的函数，this指的是`windows.id` 
3 //先给obj2创建了一个fun属性，这个属性的值是一个函数，this知道的是对象的obj2的属性a的值。
```


16. 下面代码输出的是什么？为什么？

```javascript
var a = 2
var obj = {
 a : 1,
 fun : () => {
  console.log(this.a)
 }
}
var obj2 ={
 a : 3
}
obj.fun()          // ?
var fun = obj.fun;
fun()              // ?
obj2.fun = obj.fun
obj2.fun()         // ?
```

输出是：

```
2
2
2
```

理由:箭头函数中 `this` 是静态绑定，`this`指向不变，均值得是定义生效时所在的对象。
定义生效时,`this`绑定箭头函数和fun以key value的形式存在，处于obj对象内，this的作用域继承自obj所在的作用域中的this，即全局对象。

> this静态绑定就是：this继承自父执行上下文。
> 个人理解，**this指向的固化，并不是箭头函数内部存在绑定this的机制，应该是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正因为它没有this，所以也不能作为构造函数。**


17. 箭头函数的this静态绑定是什么含义？和this的动态绑定有什么区别？请写出示例代码说明区别

静态绑定的指的是this绑定的声明时的对象，动态绑定是this绑定的试运行环境的对象。

例如：

```javascript
var a = 3
var obj = {
 a : 1,
 fun : () => {
  console.log(this.a)
 }
}
obj.fun()
var fun = obj.fun;
fun()
```

this静态绑定会将`this`指向定义时的对象，即 `window`对象，所以两次输出都是3；而动态绑定是运行时确定绑定的对象，所以如下代码输出的是1和2.

```javascript
var a = 2
var obj = {
 a : 1,
 fun : function () {
  console.log(this.a)
 }
}
obj.fun()          // ?
var fun = obj.fun;
fun()
```



18. 下面代码输出是什么？结合前几题，试理解this静态绑定的绑定规则。

```javascript
var id = 2;
function foo() {
return () => {
  console.log('id:', this.id);
};
}
foo.call({id: 1})()
```

代码的输出：

```
1
```

解this静态绑定的绑定规则：this继承自父执行上下文。


19. 对于function声明的函数，如果想实现箭头函数的this静态绑定，需要怎么做？

//TODO

20. 什么是柯里化(currying)，它有什么作用？

柯里化（currying），意思是将多参数的函数转换成单参数的形式，并且返回接受余下的参数而且返回结果的新函数的技术。

他可以更好的**复用代码，提高函数的适用性和易用性**。例如已经定义了求两数和的函数 `sum= (a, b) => a+b`，那么可以很好的复用代码，编写任一个数与5的和的函数,` sum= (a, b=5) => a+b` 。

柯里化会**固定变量**。

21. 下面代码输出的是什么？为什么？

```javascript
let fun1 = i => i*2
let fun2 = i => {i*2}
console.log(fun1(1))   // ?
console.log(fun2(1))   // ?
```

输出的是：

```
2
undifined
```

第一个输出： 执行箭头函数，乘2并输出。
第二个输出： 箭头函数中表达式部分如果是大括号（即语句块），箭头函数不会自动返回一个值，需要显示 添加 `return`。否则执行时，默认返回undefined。

如果箭头函数后面不添加大括号，那么表达式部分只能有一行代码。

