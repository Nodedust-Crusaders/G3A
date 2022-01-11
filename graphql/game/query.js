const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { getGame, getGames, getAvailableGames } = require("../../handlers/games");
const { gameType } = require("./types");

const gameQuery = new GraphQLObjectType({
  name: "GameQuery",
  fields: {
    games: {
      type: new GraphQLList(gameType),
      resolve: async (source, args, context) => {
        if (!context.user) return null;
        return getGames();
      },
    },
    availableGames: {
      type: new GraphQLList(gameType),
      resolve: async (source, args, context) => {
        if (!context.user) return null;
        return getAvailableGames();
      },
    },
    game: {
      type: gameType,   
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (source, { id }, context) => {
        if (!context.user) return null;
        return getGame(id);
      },
    },
  },
});

module.exports = gameQuery;
