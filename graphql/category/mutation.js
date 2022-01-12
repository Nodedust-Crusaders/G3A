const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");
const {
  createCategory,
  editCategory,
  destroyCategory,
} = require("../../handlers/categories");
const { AdminPermissions } = require("../../utils/constants");
const {
  categoryType,
  categoryInputType,
  categoryResultType,
} = require("./types");
const { checkAuthorizationStatus } = require("../utils");

const categoryMutation = new GraphQLObjectType({
  name: "CategoryMutation",
  fields: {
    addCategory: {
      type: categoryResultType,
      args: {
        categoryInput: { type: categoryInputType },
      },
      resolve: async (source, args, context) => {
        const authzStatus = await checkAuthorizationStatus(
          context,
          AdminPermissions.FULL_ACCESS_CATEGORY
        );
        if (authzStatus) return authzStatus;

        const data = args.categoryInput;
        console.log(data);
        const result = await createCategory(data);

        return result;
      },
    },
    editCategory: {
      type: categoryResultType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        data: { type: categoryInputType },
      },
      resolve: async (source, args, context) => {
        const authzStatus = await checkAuthorizationStatus(
          context,
          AdminPermissions.FULL_ACCESS_CATEGORY
        );
        if (authzStatus) return authzStatus;

        const id = args.id;
        const data = args.data;
        const result = await editCategory(id, data);

        return result;
      },
    },
    removeCategory: {
      type: categoryResultType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, args, context) => {
        const authzStatus = await checkAuthorizationStatus(
          context,
          AdminPermissions.FULL_ACCESS_CATEGORY
        );
        if (authzStatus) return authzStatus;

        const result = await destroyCategory(args.id);
        return result;
      },
    },
  },
});

module.exports = categoryMutation;
