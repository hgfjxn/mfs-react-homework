function calc(add){
 return function(mul){
  return function(origin){
   return (origin + add) * mul
  }
 }
}
