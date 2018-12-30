module.exports = function(list, count){
	if(list.length < count){
		throw new Error();
	}

	const input = list.slice();
	const output = [];
	while(output.length < count){
		const index = Math.round(Math.random() * (input.length - 1));
		let [temp] = input.splice(index, 1);
		if(temp){
			output.push(temp);
		}
	
	}

	return output

}
