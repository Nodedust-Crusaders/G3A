const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const {
  addPublisher,
  removePublisher,
  editPublisher,
} = require("../../handlers/publishers");
const { AdminPermissions } = require("../../utils/constants");
const { publisherType, publisherResultType } = require("./types");

const publisherMutation = new GraphQLObjectType({
  name: "PublisherMutation",
  fields: {
    // add publisher. #ROLE admin only
    addPublisher: {
      type: publisherResultType,
      args: {
        name: { type: GraphQLString },
      },
      resolve: async (source, { name }, context) => {
        const authzStatus = await checkAuthorizationStatus(
          context,
          AdminPermissions.FULL_ACCESS_PUBLISHER
        );
        if (authzStatus) return authzStatus;

        return addPublisher(name);
      },
    },
    // remove publisher. #ROLE admin only
    removePublisher: {
      type: publisherResultType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (source, { id }, context) => {
        const authzStatus = await checkAuthorizationStatus(
          context,
          AdminPermissions.FULL_ACCESS_PUBLISHER
        );
        if (authzStatus) return authzStatus;

        return removePublisher(id);
      },
    },
    // edit publisher. #ROLE admin only
    editPublisher: {
      type: publisherResultType,
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
      },
      resolve: async (source, { id, name }, context) => {
        const authzStatus = await checkAuthorizationStatus(
          context,
          AdminPermissions.FULL_ACCESS_PUBLISHER
        );
        if (authzStatus) return authzStatus;

        return editPublisher(id, name);
      },
    },
  },
});

module.exports = publisherMutation;
