const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } = require("graphql");
const {
  gameInputType,
  gameResultType,
  editGameInputType,
  editGameResultType
} = require("./types");

const { createGame, removeGame, editGame } = require("../../handlers/games");
const gameMutation = new GraphQLObjectType({
  name: "GameMutation",
  fields: {
    addGame: {
      type: gameResultType,
      args: {
        gameInput: { type: gameInputType }
      },
      resolve: async (source, args) => {
        const data = args.gameInput;
        const result = await createGame(data);

        return result;
      }
    },
    removeGame: {
      type: gameResultType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (source, args) => {
        const result = await removeGame(args.id);

        return result;
      }
    },
    editGame: {
      type: gameResultType,
      args: {
        data:{
          type: editGameInputType
      }},
      resolve: async (source, args) => {
        const id = args.data.id;
        const data = args.data.newGameData;
        const result = await editGame(id, data);

        return result;
      }
    },
  },
});

module.exports = gameMutation;
