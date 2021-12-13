const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");

const categoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports = { categoryType };
