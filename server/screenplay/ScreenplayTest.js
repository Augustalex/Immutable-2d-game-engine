ScreenplayGenerator = require('./ScreenplayGenerator.js')
let screenplayGenerator = ScreenplayGenerator()

let instance = screenplayGenerator.generate(3)

for(let i = 0; i < instance.length; i++ ){
	console.log(instance[i]);
}
