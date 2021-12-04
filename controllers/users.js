const db = require('../models')

module.exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await db.User.findAll();
        res.send(allUsers)
    } catch(error) {
        console.error("Something went wrong in Users controller")
        res.send({
            error: "Something went wrong in Users controller",
        })
    }
}