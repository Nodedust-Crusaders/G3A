const db = require("../models");

const getPurchases = async () => {
    try {
        const purchases = await db.Purchase.findAll();
        return purchases;
    } catch (err) {
        console.log("Error @handlers/getPurchases:", err);
        return null;
    }
}

const getUserPurchasesWithId = async (id) => {
    try {
        const user = await db.User.findByPk(id);
        const purchases = await user.getPurchases();
        return purchases;

    } catch (err) {
        console.log("Error @handlers/getUserPurchasesWithId:", err);
        return null;       
    }
}
module.exports = {getPurchases, getUserPurchasesWithId};