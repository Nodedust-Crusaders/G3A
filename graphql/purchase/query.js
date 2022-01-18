const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");
const { getPurchases, getPurchase } = require("../../handlers/purchases");
const { getUserPurchasesWithId } = require("../../handlers/purchases");
const { AdminPermissions } = require("../../utils/constants");
const { purchaseType } = require("./types");

const purchaseQuery = new GraphQLObjectType({
  name: "PurchaseQuery",
  fields: {
    // all purchases from the db. #ROLE admin only
    purchases: {
      type: new GraphQLList(purchaseType),
      resolve: async (source, args, context) => {
        if (
          !context.user ||
          !(await context.user.can(AdminPermissions.FULL_ACCESS_PURCHASE))
        )
          return null;
        return getPurchases();
      },
    },
    // purchases of currently logged user. all users should have access to see their own purchases.
    userPurchases: {
      type: new GraphQLList(purchaseType),
      resolve: async (source, args, context) => {
        if (!context.user) return null;
        return getUserPurchasesWithId(context.user.id);
      },
    },
    // see purchases of user with given id. #ROLE admin only
    purchasesWithUserId: {
      type: new GraphQLList(purchaseType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, { id }, context) => {
        if (
          !context.user ||
          !(await context.user.can(AdminPermissions.FULL_ACCESS_PURCHASE))
        )
          return null;
        return getUserPurchasesWithId(id);
      },
    },
  },
});

module.exports = purchaseQuery;
