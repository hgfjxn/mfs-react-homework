## 代码题

代码题代码：[见我的github](https://github.com/hgfjxn/mfs-react-homework)

1. 请写出与下面 ES5 代码等价的 ES6 代码

    ```
    function Point(x, y) {
       this.x = x;
       this.y = y;
    }

    Point.prototype.toString = function () {
       return '(' + this.x + ', ' + this.y + ')';
    };

    var p = new Point(1, 2);

    ```
	
	ES6等价代码：
	
	```javascript
	class Point{
		constructor(x, y){
			this.x = x;
			this.y = y;
		}
		
		toString(){
			return '(' + this.x + ', ' + this.y + ')';
		}
	}
	
	let p = new Point(1,2)
	```

2. 请实现`Circle`类，其表示平面上的一个圆，构造时需要传入 `x`,`y`,`r` 分别为圆在平面上的坐标 (x,y）和其半径 `r`，需要支持使用 `circle.area` 获取当前圆的面积

	```javascript
	class Circle{
		constructor(x,y,r){
			if(r <=0)
				throw Error("圆的半径大于0")
			this.x = x;
			this.y = y;
			this.r = r;
		}
		
		area(){
			return Math.PI * this.r * this.r;
		}
	}
	```
	
	测试用例：
	
	```javascipt
	circle = new Circle(1,2,3)
	console.log(circle.area())

	circle = new Circle(1,2,0)
	console.log(circle.area())
	```

3. 请实现一个类方法的修饰器，使得每次调用修饰器修饰的方法，都会打印 log

	定义修饰器：
	
	```javascript
	function log(target, name, descriptor){
		var origin = descriptor.value;
		
		descriptor.value = function(target, name, descriptor){
			console.log('Calling ${name} with', arguments);
			return origin.apply(this, arguments);
		}
		
		return descriptor;
	}
	```
	
	测试修饰器功能：
	
	```javascript
	class Sum{
		@log
		add(a, b){
			return a + b;
		}
	}
	
	let x = new Sum();
	x.add(1,2);
	```
