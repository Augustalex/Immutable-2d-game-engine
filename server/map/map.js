const bioms = [

	"Forest",
	"City",
	"Town",
	"Lake",
	"Mountain",
	"Jungle",
	"Beach",
	"Desert"
]

const nrOfBioms = 6

const genres = require('../common/genres.js')
getRandom = require('../common/getRandom.js')
getRandomSet = require('../common/getRandomSet.js')
shuffle = require('../common/shuffle.js')

module.exports = function(){

	return {generate}

	function generate(){
	
		let map = []
		let nrOfGenres = []
		let sumOfGenres = 0

		for(i = 0; i < nrOfBioms; i ++){
		
			let temp = getRandom([1, 1, 2, 2, 3, 4])
			sumOfGenres += temp
			nrOfGenres.push(temp)
		}

		subBioms = getRandomSet(bioms, nrOfBioms)
		subGenres = []
		
		while(subGenres.length < sumOfGenres - nrOfBioms){
		
			subGenres = subGenres.concat(genres)
		}
		
		subGenres = shuffle(genres.concat(getRandomSet(subGenres, sumOfGenres - nrOfBioms)))
		
		subGenreInstance = 0
		distrubutedGenres = []

		for(i = 0; i < nrOfBioms; i++ ){
			
			distrubutedGenres.push(new Set)
			for(j = 0; j < nrOfGenres[i]; j++ ){
			
				distrubutedGenres[distrubutedGenres.length - 1].add(subGenres[subGenreInstance])
				subGenreInstance += 1
			
			}	
		}

		for(i = 0; i < nrOfBioms; i++ ){
			
			map.push({
				name: subBioms[i],
				genres: Array.from(distrubutedGenres[i])		
			})
		
		}

		return map
	
	}

}
