const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} = require("graphql");
const { purchaseInputType, purchaseResultType } = require("./types");
const {
  addPurchaseHandler,
  removePurchaseHandler,
} = require("../../handlers/purchases");
const { AdminPermissions } = require("../../utils/constants");

const purchaseMutation = new GraphQLObjectType({
  name: "PurchaseMutation",
  fields: {
    // currently logged user make a purchase. all users should have access to buy things to their own logged accounts.
    purchase: {
      type: purchaseResultType,
      args: {
        GameId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, args, context) => {
        const GameId = args.GameId;
        const result = await addPurchaseHandler(context.user.id, GameId);

        return result;
      },
    },

    // Add purchase gameId to user userId. #ROLE Only admins should be able to do this
    addPurchaseToUser: {
      type: purchaseResultType,
      args: {
        UserId: { type: new GraphQLNonNull(GraphQLID) },
        GameId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, args, context) => {
        if (
          !context.user ||
          !(await context.user.can(AdminPermissions.FULL_ACCESS_PURCHASE))
        )
          return null;

        const UserId = args.UserId;
        const GameId = args.GameId;
        const result = await addPurchaseHandler(UserId, GameId);

        return result;
      },
    },
    // delete purchase from db. #ROLE only admins should be able to do this
    removePurchase: {
      type: purchaseResultType,
      args: {
        UserId: { type: new GraphQLNonNull(GraphQLID) },
        GameId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (source, args, context) => {
        if (
          !context.user ||
          !(await context.user.can(AdminPermissions.FULL_ACCESS_PURCHASE))
        )
          return null;

        const { UserId, GameId } = args;
        const result = await removePurchaseHandler(UserId, GameId);

        return result;
      },
    },
  },
});

module.exports = purchaseMutation;
