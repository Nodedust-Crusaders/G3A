const db = require('../models')

module.exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await db.User.findAll();
        res.send(allUsers)
    } catch(error) {
        console.error("Something went wrong in Users controller", error)
        res.send({
            error: "Something went wrong in Users controller",
        })
    }
}

module.exports.getUsersPurchasesById = async (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const user = await db.User.findAll( {
            where: {
                id: userId
            },
            include: [
                {
                    model: db.Purchase,
                    include: [db.Game]
                }
            ],
        })
        if(!user){
            throw new Error(`No user with id ${userId} was found`)
        }
        res.send(user)
    } catch(error) {
        console.error("Something went wrong in Users controller", error)
        res.send({
            error: "Something went wrong in Users controller",
        })
    }
}