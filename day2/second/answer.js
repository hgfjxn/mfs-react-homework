function* fi(){
  let a = 0;
  let b = 1;
  while(true){
    yield a;
    [a,b]=[b,a+b];
  }
}

let [a,b,c,d,e,f,g,h,i,j]=fi()
