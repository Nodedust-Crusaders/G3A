const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } = require("graphql");
const {
  gameInputType,
  gameResultType
} = require("./types");

const { createGame, removeGame } = require("../../handlers/games");
const gameMutation = new GraphQLObjectType({
  name: "GameMutation",
  fields: {
    addGame: {  
      type: gameResultType,
      args: {
        gameInput: {type: gameInputType}
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
          id: {type: GraphQLInt}
      },
      resolve: async (source, args) => {
          const result = await removeGame(args.id);

          return result;
      }
  }
  },
});

module.exports = gameMutation;
