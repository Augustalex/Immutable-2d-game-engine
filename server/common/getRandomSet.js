module.exports = function(list, count){

	if(list.length < count){
	
		throw new Error
	}

	let input = [...list]
	let output = []

	while(output.length < count){
	
		let temp = input.splice(Math.round(Math.random() * (output.length - 1)), 1)[0]

		if(temp !== undefined){
			output.push(temp)
		}
	
	}

	return output

}
