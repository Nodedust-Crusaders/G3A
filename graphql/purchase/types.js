const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLString
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

const purchaseInputType = new GraphQLInputObjectType({
    name: "purchaseInput",
    fields: {
        userId: { type: new GraphQLNonNull(GraphQLID)},
        gameId: { type: new GraphQLNonNull(GraphQLID)}
    }
})

const purchaseResultType = new GraphQLObjectType({
    name: "purchaseResult",
    fields: {
        message: {type: GraphQLString}
    }
})
module.exports = { purchaseType, purchaseInputType, purchaseResultType };