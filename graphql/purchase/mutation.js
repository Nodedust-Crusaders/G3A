const { GraphQLObjectType } = require("graphql");
const {
    purchaseInputType,
    purchaseResultType
} = require("./types");
const { addPurchaseHandler } = require("../../handlers/purchases");

const purchaseMutation = new GraphQLObjectType({
    name: "PurchaseMutation",
    fields: {
        addPurchase: {
            type: purchaseResultType,
            args: {
                purchaseInput: {type: purchaseInputType}
            },
            resolve: async (source, args) => {
                const { userId, gameId } = args.purchaseInput;
                const result = await addPurchaseHandler(userId, gameId);

                return result
            }
        }
    }
});

module.exports = purchaseMutation
