const names = [
    "Earl Grey",
    "Näck Wallander",
    "John Canvolta",
    "Rad Pit",
    "Adam Sandal",
    "Josef Utbult",
    "Van Disel",
    "Tom Ham",
    "Anthony Napkin",
    "Christoph Rolle",
    "Christian Bald",
    "Russle Pidgeon",
    "Tiny Jackman",
    "Johnny Pepp",
    "Reese Withoutherspoon",
    "Stella Skarsgård",
    "Daniel Coolcliff",
    "Emma Whosson",
    "Kristen Sadwart",
    "Cameroon Noche",
    "Seth McBiaslane",
    "Angelina Jolene, Jolene, Jolene, Joleeeeeeeeeeene!!!",
    "Bruce's Willy"
]

const getRandom = require('../common/getRandom.js')
const getRandomSet = require('../common/getRandomSet.js')
const genres = require('../common/genres.js')

module.exports = function () {

    return { generate }

    function generate(count) {
        const actors = [];
        const usedNames = new Set();
        for (let i = 0; i < count; i++) {

            let name = getRandom(names);
            while (usedNames.has(name)) {
                name = getRandom(names);
            }
            usedNames.add(name)

            const knownGenres = []
            const nrOfKnownGenres = getRandom([1, 2, 3])

            for (let j = 0; j < nrOfKnownGenres; j++) {
                knownGenres.push({
                    genre: getRandom(genres),
                    experience: getRandom([1, 2, 2, 2, 3])
                })
            }

            actors.push({ name, knownGenres })
        }

        return actors;
    }
}
