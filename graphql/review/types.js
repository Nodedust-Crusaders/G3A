const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLUnionType,
} = require("graphql");
const { gameType } = require("../game/types");
const { userType } = require("../user/types");
const { messageResultType } = require("../types");
const db = require("../../models");

const reviewType = new GraphQLObjectType({
  name: "ReviewType",
  fields: {
    comment: { type: GraphQLString },
    rating: { type: GraphQLFloat },
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

// const reviewResultType = new GraphQLObjectType({
//   name: "reviewResult",
//   fields: {
//     message: { type: GraphQLString },
//   },
// });

const reviewResultType = new GraphQLUnionType({
  name: "ReviewResult",
  types: [reviewType, messageResultType],
  resolveType: (value) => {
    if (value instanceof db.Review) {
      return "ReviewType";
    }

    return "MessageResult";
  },
});

module.exports = { reviewType, reviewResultType };
