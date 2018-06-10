## 代码题

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

2. 请实现`Circle`类，其表示平面上的一个圆，构造时需要传入 `x`,`y`,`r` 分别为圆在平面上的坐标 (x,y）和其半径 `r`，需要支持使用 `circle.area` 获取当前圆的面积

3. 请实现一个类方法的修饰器，使得每次调用修饰器修饰的方法，都会打印 log
