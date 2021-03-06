const nameGenreCombos = [
    // Commedy
    { name: "Adam Sandlers In: His Fridge", genre: "Comedy" },
    { name: "Big Stuart", genre: "Comedy" },
    { name: "Monty Haskell and the Holy Monad", genre: "Comedy" },
    { name: "Ghostfuckers", genre: "Comedy" },
    // Adventure
    { name: "Around Your Mom In Eighty Days", genre: "Adventure" },
    { name: "Spirited Back", genre: "Adventure" },
    { name: "Raiders Of The Lost Bark", genre: "Adventure" },
    { name: "Pirates Of Somalia: The Curse Of the Trade Embargo", genre: "Adventure" },
    // Horror
    { name: "Nightmare On Elmos Street", genre: "Horror" },
    { name: "Alien 5: Out Of Sombreros", genre: "Horror" },
    { name: "Singing In The Pain", genre: "Horror" },
    { name: "The Predator IV: Back To The Playground", genre: "Horror" },
    // Thriller
    { name: "The Saw: Hanks Redemption", genre: "Thriller" },
    { name: "Schindler's To-Dos", genre: "Thriller" },
    { name: "The Seventh Harbor Seal", genre: "Thriller" },
    { name: "My Hard Knight Rises", genre: "Thriller" },
    // Romantic
    { name: "You Got STD", genre: "Romantic" },
    { name: "The 40-Year Old Wizard", genre: "Romantic" },
    { name: "Sex And the Barn", genre: "Romantic" },
    { name: "Beauty And Josef Utbult", genre: "Romantic" },
    // Action
    { name: "The Slow and The Rigorous XVI: Back To The Library", genre: "Action" },
    { name: "Braveass", genre: "Action" },
    { name: "Babewatch", genre: "Action" },
    { name: "Scott Pilgrim vs. His Mental Health", genre: "Action" }
];
const genres = require('../common/genres.js')
const getRandom = require('../common/getRandom.js')
const getRandomSet = require('../common/getRandomSet.js')

module.exports = function () {

    return { generate };

    function generate(count) {
        let subNameGenreCombos = getRandomSet(nameGenreCombos, count);
        let scripts = [];

	for(let i = 0; i < count; i++){    
		let nr_of_acts = getRandom([2, 3, 4]);
        	let acts = [];

        	for (let j = 0; j < nr_of_acts; j++) {
            		acts.push({
                		genre: getRandom(genres),
                		productionTime: getRandom([1, 1, 1, 2, 2, 3])
            		});
        	}

		scripts.push({
            		acts,
            		name: subNameGenreCombos[i].name,
            		genre: subNameGenreCombos[i].genre,
            		price: 10000,
            		status: 'available'
        		
		})
    	}
	return scripts
	
   }
}
