const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");
const { gameType } = require("../game/types");
const { userType } = require("../user/types");

const purchaseType = new GraphQLObjectType({
  name: "PurchaseType",
  fields: {
    price: { type: GraphQLFloat },
    user: {
      type: userType,
      resolve: async (source) => {
        return await source.getUser();
      },
    },
    game: {
      type: gameType,
      resolve: async (source) => {
        return await source.getGame();
      },
    },
  },
});

const purchaseInputType = new GraphQLInputObjectType({
  name: "purchaseInput",
  fields: {
    UserId: { type: new GraphQLNonNull(GraphQLID) },
    GameId: { type: new GraphQLNonNull(GraphQLID) },
  },
});

const purchaseResultType = new GraphQLObjectType({
  name: "purchaseResult",
  fields: {
    message: { type: GraphQLString },
  },
});
module.exports = { purchaseType, purchaseInputType, purchaseResultType };
