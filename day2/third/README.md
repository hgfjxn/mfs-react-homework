# 第三题

## 问题

对于单参数函数，如果通过解构语法设置默认值，修改代码实现默认值b = 10

```javascript
function test({a,b}){
 console.log(a,b)
}
```

## 解答

```javascript
function test({a,b=10}){
 console.log(a,b)
}
```

> 注意，解构设置默认值不同于函数参数制定默认值。参数制定默认值类似： `function name({} ={})`
