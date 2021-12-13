const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");
const { categoryType } = require("../category/types");

const gameType = new GraphQLObjectType({
  name: "GameType",
  fields: {
    id: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    releaseYear: { type: GraphQLInt },
    rating: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    discount: { type: GraphQLFloat },
    currencyId: { type: GraphQLInt },
    platformId: { type: GraphQLInt },
    category: {
      type: categoryType,
      resolve: async (source) => {
        return await source.getCategory();
      },
    },
    publisherId: { type: GraphQLInt },
  },
});

module.exports = { gameType };
