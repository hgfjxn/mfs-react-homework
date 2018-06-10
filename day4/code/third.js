function log(target, name, descriptor){
    var origin = descriptor.value;
    
    descriptor.value = function(target, name, descriptor){
	console.log('Calling ${name} with', arguments);
	return origin.apply(this, arguments);
    }
    
    return descriptor;
}

class Sum{
    @log
    add(a, b){
	return a + b;
    }
}

let x = new Sum();
x.add(1,2);
