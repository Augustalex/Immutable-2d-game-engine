module.exports = function getRandom(list){
        
        return list[Math.round(Math.random() * (list.length - 1))]

}

