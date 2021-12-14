const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLFloat
} = require ("graphql");

const purchaseType = new GraphQLObjectType({
    name: "PurchaseType",
    fields: {
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        gameId: { type: GraphQLID },
        price: { type: GraphQLFloat }
    }
});

module.exports = { purchaseType };