const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require("graphql");

const platformType = new GraphQLObjectType({
  name: "PlatformType",
  fields: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const platformInputType = new GraphQLInputObjectType({
  name: "PlatformInput",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

const platformResultType = new GraphQLObjectType({
  name: "PlatformResult",
  fields: {
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

module.exports = { platformType, platformInputType, platformResultType };
