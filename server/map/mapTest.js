Map = require('./map.js')
let map = Map()

let instance = map.generate()

for(i = 0; i < instance.length; i++ ){
	console.log(instance[i])
}
