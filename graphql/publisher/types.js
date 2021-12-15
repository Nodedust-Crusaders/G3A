const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");

const publisherType = new GraphQLObjectType({
  name: "PublisherType",
  fields: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports = { publisherType };
