# 第二题

## 问题

请使用解构语法实现获取斐波那契数列前10个数

## 解答

1. 此处需要使用Generator函数创建斐波那契数列生成器。
2. 然后再用解构函数获取前10个数。

初次解答：

```javascript
function* fi(){
  let a = 0
  let b = 1
  while(true){
    yield a
    [a,b]=[b,a+b]
  }
}

let [a,b,c,d,e,f,g,h,i,j]=fi()
```

此时答案并不正确。所有结果均为 `[1,1]`


```javascript
function* fi(){
  let a = 0;
  let b = 1;
  while(true){
    yield a;
    [a,b]=[b,a+b];
  }
}

let [a,b,c,d,e,f,g,h,i,j]=fi()
```

语句后添加分号，执行成功。这是为什么？？？
