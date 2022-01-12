const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLString,
  GraphQLUnionType,
} = require("graphql");
const { gameType } = require("../game/types");
const { userType } = require("../user/types");
const { messageResultType } = require("../types");
const db = require("../../models");

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

const purchaseResultType = new GraphQLUnionType({
  name: "PurchaseResult",
  types: [purchaseType, messageResultType],
  resolveType: (value) => {
    if (value instanceof db.Purchase) {
      return "PurchaseType";
    }

    return "MessageResult";
  },
});

module.exports = { purchaseType, purchaseResultType };
