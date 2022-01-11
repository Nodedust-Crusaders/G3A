const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { getGame, getGames, getAvailableGames } = require("../../handlers/games");
const { gameType } = require("./types");

const gameQuery = new GraphQLObjectType({
  name: "GameQuery",
  fields: {
    // #ROLE this gets all games from the DB. both available and unavailable.
    // only admins should be able to see all of them
    games: {
      type: new GraphQLList(gameType),
      resolve: async (source, args, context) => {
        if (!context.user) return null;
        return getGames();
      },
    },
    // This gets all games that have the isAvailable flag set to true.
    // All users should have access to this.
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
