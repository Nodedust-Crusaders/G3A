const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");
const { categoryType } = require("../category/types");
const { platformType } = require("../platform/types");
const { publisherType } = require("../publisher/types");

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
    CurrencyId: { type: GraphQLInt },
    PlatformId: { type: GraphQLInt },
    category: {
      type: categoryType,
      resolve: async (source) => {
        return await source.getCategory();
      },
    },
    platform: {
      type: platformType,
      resolve: async (source) => {
        return await source.getPlatform();
      },
    },
    publisher: {
      type: publisherType,
      resolve: async (source) => {
        return await source.getPublisher();
      },
    },
    PublisherId: { type: GraphQLInt },
  },
});

module.exports = { gameType };
