ActorGenerator = require('./ActorGenerator.js')
let actorGenerator = ActorGenerator()

let instance = actorGenerator.generate(7)

for(i = 0; i < instance.length; i++ ){
	console.log(instance[i])
}
