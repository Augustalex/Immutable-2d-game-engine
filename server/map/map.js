const bioms = [

	{name: "Forest", imageUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fc402277.ssl.cf1.rackcdn.com%2Fphotos%2F946%2Fimages%2Fcarousel_small%2Fforests-why-matter_63516847.jpg%3F1345534028&imgrefurl=https%3A%2F%2Fwww.worldwildlife.org%2Fhabitats%2Fforest-habitat&docid=lWXel0K4gROJWM&tbnid=_0tNYTcBaCnsAM%3A&vet=10ahUKEwj_wIX-7cXfAhXhpIsKHfA5Dw0QMwh0KAswCw..i&w=660&h=495&client=firefox-b-ab&bih=969&biw=1920&q=forest&ved=0ahUKEwj_wIX-7cXfAhXhpIsKHfA5Dw0QMwh0KAswCw&iact=mrc&uact=8"},
	{name: "City", imageUrl: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiC8pWe7sXfAhVNtosKHXP2CcAQjRx6BAgBEAU&url=https%3A%2F%2Fwww.globsec.org%2Fnews%2Fglobsec-city-challenge%2F&psig=AOvVaw3FTEjlY1J7TwV6bstm6zgS&ust=1546201129870704"},
	{name: "Town", imageUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fc1.staticflickr.com%2F7%2F6081%2F6084939144_84569069fb_b.jpg&imgrefurl=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Fbencito_traveller%2F6084939144&docid=4rkn80hutic6AM&tbnid=4AI7wQNzv11m7M%3A&vet=10ahUKEwjV4r7K7sXfAhUiqYsKHQmoBxEQMwhWKAswCw..i&w=1024&h=754&client=firefox-b-ab&bih=969&biw=1920&q=prairie%20town&ved=0ahUKEwjV4r7K7sXfAhUiqYsKHQmoBxEQMwhWKAswCw&iact=mrc&uact=8"},
	{name: "Lake", imageUrl: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwj75ZHa7sXfAhUupYsKHZ6PBaIQjRx6BAgBEAU&url=https%3A%2F%2Funsplash.com%2Fsearch%2Fphotos%2Flake&psig=AOvVaw2XvB4ZQEBhkmvmgvLD1LIM&ust=1546201259257655"},
	{name: "Mountain", imageUrl: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi16qDo7sXfAhXjkYsKHS--BFUQjRx6BAgBEAU&url=http%3A%2F%2Fwww.wallpaperbetter.com%2Fnature-and-landscape-wallpaper%2Fgorgeous-desert-mountain-97973&psig=AOvVaw1P67UiH7m3ScpAV69-tyQf&ust=1546201279413221"},
	{name: "Beach", imageUrl: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwizvKn27sXfAhXhoYsKHX-YDDEQjRx6BAgBEAU&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeach%2F&psig=AOvVaw0Lbzy_qs7GtPuzEpaM1uex&ust=1546201310889753"},
	{name: "Jungle", imageUrl: "https://www.telegraph.co.uk/content/dam/Travel/2018/September/El-Yunque-morning-mist-iStock-535499464.jpg?imwidth=450"},
	{name: "Desert", imageUrl: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjm9PLv78XfAhWhiIsKHWzoBMAQjRx6BAgBEAU&url=https%3A%2F%2Fwww.smithsonianmag.com%2Fscience-nature%2Fwhat-really-turned-sahara-desert-green-oasis-wasteland-180962668%2F&psig=AOvVaw0frcAPPv3S5b_bPXXSn-So&ust=1546201575626765"}

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
		
		return subGenres

		/*
		for(i = 0; i < 6; i++ ){
			
			map.push({
			
				name: subBioms[i],

			
			})
		
		}
		*/
	
	}

}
