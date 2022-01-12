const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const {
  getGame,
  getGames,
  getAvailableGames,
  getFilteredGames,
} = require("../../handlers/games");
const { AdminPermissions } = require("../../utils/constants");
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
    // This gets all games, filtered by category, publisher, platform or a mix of both.
    // If admin, also shows unavailable games. If user, only available games that match the criteria are shown
    availableGames: {
      type: new GraphQLList(gameType),
      resolve: async (source, args, context) => {
        if (!context.user) return null;
        return getAvailableGames();
      },
    },

    filteredGames: {
      type: new GraphQLList(gameType),
      args: {
        categoryId: { type: GraphQLID },
        platformId: { type: GraphQLID },
        publisherId: { type: GraphQLID }
      },
      resolve: async (source, args, context) => {
        if (!context.user) return null;
        let showUnavailable = false;
        
        if (!(await context.user.can(AdminPermissions.FULL_ACCESS_GAME))) {
          showUnavailable = true;
        }

        res = getFilteredGames(args.categoryId, args.platformId, args.publisherId, showUnavailable);
        return res;
      },
    },
  },
});

module.exports = gameQuery;
