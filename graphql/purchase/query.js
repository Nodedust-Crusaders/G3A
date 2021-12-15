const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { getPurchases, getPurchase } = require("../../handlers/purchases");
const { getUserPurchasesWithId } = require("../../handlers/purchases");
const { purchaseType } = require("./types");

const purchaseQuery = new GraphQLObjectType({
    name:"PurchaseQuery",
    fields: {
        purchases: {
            type: new GraphQLList (purchaseType),
            resolve: async (source, args, context) => {
                if (!context.user) return null;
                return getPurchases();
            }
        },
        userPurchases: {
            type: new GraphQLList (purchaseType),
            resolve: async (source, args, context) => {
                if (!context.user) return null;
                return getUserPurchasesWithId(context.user.id);
            }           
        },
        purchasesWithUserId: {
            type: new GraphQLList (purchaseType),
            args: {
                id: { type: GraphQLID },
            },
            resolve: async (source, { id }, context) => {
                if (!context.user) return null;
                return getUserPurchasesWithId(id);
            }
        }
    }
})

module.exports = purchaseQuery