const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");
const { getPlatforms, getPlatform } = require("../../handlers/platforms");
const { AdminPermissions } = require("../../utils/constants");
const { platformType } = require("./types");

const platformQuery = new GraphQLObjectType({
  name: "PlatformQuery",
  fields: {
    platforms: {
      type: new GraphQLList(platformType),
      resolve: async (source, args, context) => {
        if (!context.user) return null;

        return getPlatforms();
      },
    },
    platform: {
      type: platformType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, { id }, context) => {
        if (!context.user) return null;

        return getPlatform(id);
      },
    },
  },
});

module.exports = platformQuery;