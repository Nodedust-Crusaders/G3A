const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInputObjectType,
} = require("graphql");
const db = require("../../models");
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

const gameInputType = new GraphQLInputObjectType({
  name: "GameInputType",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    releaseYear: { type: GraphQLInt },
    rating: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    discount: { type: GraphQLFloat },
    PlatformId: { type: GraphQLInt },
    CategoryId: { type: GraphQLInt },
    PublisherId: { type: GraphQLInt }
  }

});

const gameResultType = new GraphQLObjectType({
  name: "GameResult",
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
  }})
const editGameInputType = new GraphQLInputObjectType({
  name: "EditGameInputType",
  fields: {
    id: { type: GraphQLInt },
    newGameData: { type: gameInputType }
  }
})


module.exports = { gameType, gameInputType, gameResultType, editGameInputType };
