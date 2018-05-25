# 第五题

## 问题

请将下面函数柯里化(currying)，需要写出箭头函数和非箭头函数两种答案

```javascript
function cala(add, mul, origin) {
 return (origin + add) * mul
}
```

## 解答


箭头函数版本

```javascript
let calc = add => mul => origin => (origin + add) * mul
```

非箭头函数版本

```javascript
function calc(add){
 return function(mul){
  return function(origin){
   return (origin + add) * mul
  }
 }
}
```

## 参考

[柯里化参考文档](https://segmentfault.com/a/1190000012364000 "柯里化参考")
