const {Sheet1 : gamesData} = require('./GamesData.json')

const getGamesNames = () => {
    const namesSet = new Set()
    gamesData.forEach(gd => {
        if(gd.Title){
            namesSet.add(gd.Title)
        }
    });
    return Array.from(namesSet)
}

const getGamesCategories = () => {
    const categoriesSet = new Set()
    gamesData.forEach(gd => {
        currentCaegories = gd.Genre.split(',')
        currentCaegories.forEach(cc => {
            if(cc){
                categoriesSet.add(cc)
            }
        })
    })
    return Array.from(categoriesSet)
}

const getGamesPublishers = () => {
    const publishersSet = new Set()
    gamesData.forEach(gd => {
        if(gd.Publisher){
            publishersSet.add(gd.Publisher)
        }
    })
    return Array.from(publishersSet)
}

module.exports.gamesNames = getGamesNames()

module.exports.gamesCategories = getGamesCategories()

module.exports.gamesPublishers = getGamesPublishers()

module.exports.rawGamesData = gamesData


