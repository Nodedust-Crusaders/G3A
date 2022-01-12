const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString } = require("graphql");
const {
    getPublishers, getPublisher
} = require("../../handlers/publishers");
const { AdminPermissions } = require("../../utils/constants");
const { publisherType, publisherResultType } = require("./types");

const publisherQuery = new GraphQLObjectType({
    name: "PublisherQuery",
    fields: {
        // See all game publishers.
        publishers: {
            type: new GraphQLList(publisherType),
            resolve: async (source, args, context) => {
                if (!context.user) return null;
                return getPublishers();
            },
        },
        // get publisher with id.
        publisher: {
            type: publisherType,
            args: {
                id: { type: GraphQLID },
            },
            resolve: async (source, { id }, context) => {
                if (!context.user) return null;
                return getPublisher(id);
            },
        },
    },
});

module.exports = publisherQuery;
