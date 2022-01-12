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

const categoryResultType = new GraphQLUnionType({
  name: "CategoryResult",
  types: [categoryType, messageResultType],
  resolveType: (value) => {
    if (value instanceof db.Category) {
      return "CategoryType";
    }

    return "MessageResult";
  },
});

module.exports = { categoryType, categoryInputType, categoryResultType };
