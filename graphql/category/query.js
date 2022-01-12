const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const { getCategories, getCategory } = require("../../handlers/categories");
const { AdminPermissions } = require("../../utils/constants");
const { categoryType } = require("./types");

const categoryQuery = new GraphQLObjectType({
  name: "CategoryQuery",
  fields: {
    categories: {
      type: new GraphQLList(categoryType),
      resolve: async (source, args, context) => {
        if (!context.user) return null;

        return getCategories();
      },
    },
    category: {
      type: categoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, { id }, context) => {
        if (!context.user) return null;

        return getCategory(id);
      },
    },
  },
});

module.exports = categoryQuery;
