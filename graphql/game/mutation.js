const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");
const { AdminPermissions } = require("../../utils/constants");
const { gameInputType, gameResultType, editGameInputType } = require("./types");
const {
  createGame,
  destroyGame,
  setGameVisibility,
  editGame,
} = require("../../handlers/games");
const { checkAuthorizationStatus } = require("../utils");

const gameMutation = new GraphQLObjectType({
  name: "GameMutation",
  fields: {
    addGame: {
      type: gameResultType,
      args: {
        gameInput: { type: gameInputType },
      },
      resolve: async (source, args, context) => {
        const authzStatus = await checkAuthorizationStatus(
          context,
          AdminPermissions.FULL_ACCESS_GAME
        );
        if (authzStatus) return authzStatus;

        const data = args.gameInput;
        const result = await createGame(data);

        return result;
      },
    },
    // deletes game from DB
    destroyGame: {
      type: gameResultType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (source, args, context) => {
        const authzStatus = await checkAuthorizationStatus(
          context,
          AdminPermissions.FULL_ACCESS_GAME
        );
        if (authzStatus) return authzStatus;

        const result = await destroyGame(args.id);

        return result;
      },
    },
    // marks game as unavailable - is hidden from showAvailableGames query
    // why? to preserve purchase history.
    setGameVisibility: {
      type: gameResultType,
      args: {
        id: { type: GraphQLInt },
        status: { type: GraphQLBoolean },
      },
      resolve: async (source, args, context) => {
        const authzStatus = await checkAuthorizationStatus(
          context,
          AdminPermissions.FULL_ACCESS_GAME
        );
        if (authzStatus) return authzStatus;

        const result = await setGameVisibility(args.id, args.status);

        return result;
      },
    },

    editGame: {
      type: gameResultType,
      args: {
        data: {
          type: editGameInputType,
        },
      },
      resolve: async (source, args, context) => {
        const authzStatus = await checkAuthorizationStatus(
          context,
          AdminPermissions.FULL_ACCESS_GAME
        );
        if (authzStatus) return authzStatus;

        const id = args.data.id;
        const data = args.data.newGameData;
        const result = await editGame(id, data);

        return result;
      },
    },
  },
});

module.exports = gameMutation;
