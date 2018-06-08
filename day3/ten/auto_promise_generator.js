let fs = require('fs')

let readFile = function(filepath){
    return new Promise(function(resolve, reject){
	fs.readFile(filepath, function(err,data){
	    if(err)reject(err)
	    resolve(data)
	})
    })
}

let gen = function* (){
    var data = yield readFile('/Users/guangfuhe/test.ttx')
    console.log(data)
    data = yield readFile('/Users/guangfuhe/test.ttx')
    console.log(data)
}

function run(gen){
    var g = gen()

    function next(data){
	var result = g.next(data)
	if(result.done) return result.value
	result.value.then(function(data){
	    next(data)
	})
    }

    next()
}

run(gen)
