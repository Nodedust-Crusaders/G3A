const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLUnionType,
} = require("graphql");
const { messageResultType } = require("../types");
const db = require("../../models");

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

const platformResultType = new GraphQLUnionType({
  name: "PlatformResult",
  types: [platformType, messageResultType],
  resolveType: (value) => {
    if (value instanceof db.Platform) {
      return "PlatformType";
    }

    return "MessageResult";
  },
});

module.exports = { platformType, platformInputType, platformResultType };
