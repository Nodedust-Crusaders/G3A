const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

const messageResultType = new GraphQLObjectType({
  name: "MessageResult",
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports = { messageResultType };
