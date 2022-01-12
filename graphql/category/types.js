const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require("graphql");

const categoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const categoryInputType = new GraphQLInputObjectType({
  name: "CategoryInput",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

const categoryResultType = new GraphQLObjectType({
  name: "CategoryResult",
  fields: {
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

module.exports = { categoryType, categoryInputType, categoryResultType };
