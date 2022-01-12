const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLUnionType,
} = require("graphql");
const { messageResultType } = require("../types");
const db = require("../../models");

const publisherType = new GraphQLObjectType({
  name: "PublisherType",
  fields: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const publisherResultType = new GraphQLUnionType({
  name: "PublisherResult",
  types: [publisherType, messageResultType],
  resolveType: (value) => {
    if (value instanceof db.Publisher) {
      return "PublisherType";
    }

    return "MessageResult";
  },
});

module.exports = { publisherType, publisherResultType };
