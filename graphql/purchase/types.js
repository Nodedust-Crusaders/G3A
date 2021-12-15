const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLString
} = require ("graphql");
const { gameType } = require("../game/types");
const { userType } = require("../user/types");

const purchaseType = new GraphQLObjectType({
    name: "PurchaseType",
    fields: {
        id: { type: GraphQLID },
        price: { type: GraphQLFloat },
        user: { 
            type: userType,
            resolve: async (source) => {
                return await source.getUser();
            }
        },
        game: { 
            type: gameType,
            resolve: async (source) => {
                return await source.getGame();
            }
        },
    }
});

const purchaseInputType = new GraphQLInputObjectType({
    name: "purchaseInput",
    fields: {
        userId: { type: new GraphQLNonNull(GraphQLID)},
        gameId: { type: new GraphQLNonNull(GraphQLID)},
    }
})

const purchaseResultType = new GraphQLObjectType({
    name: "purchaseResult",
    fields: {
        message: {type: GraphQLString}
    }
})
module.exports = { purchaseType, purchaseInputType, purchaseResultType };