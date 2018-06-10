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

circle = new Circle(1,2,3)
console.log(circle.area())

circle = new Circle(1,2,0)
console.log(circle.area())

