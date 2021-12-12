const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const gameMutation = new GraphQLObjectType({
  name: "GameMutation",
  fields: {},
});

module.exports = gameMutation;
