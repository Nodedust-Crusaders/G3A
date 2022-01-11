const { GraphQLObjectType } = require("graphql");
const { purchaseInputType, purchaseResultType } = require("./types");
const {
  addPurchaseHandler,
  removePurchaseHandler,
} = require("../../handlers/purchases");

const purchaseMutation = new GraphQLObjectType({
  name: "PurchaseMutation",
  fields: {
    // currently logged user make a purchase. all users should have access to buy things to their own logged accounts.
    purchase: {
      type: purchaseResultType,
      args: {
        purchaseInput: { type: purchaseInputType },
      },
      resolve: async (source, args, context) => {
        const { UserId, GameId } = args.purchaseInput;
        const result = await addPurchaseHandler(context.user.id, GameId);

        return result;
      },
    },

    // Add purchase gameId to user userId. #ROLE Only admins should be able to do this
    addPurchaseToUser: {
      type: purchaseResultType,
      args: {
        purchaseInput: { type: purchaseInputType },
      },
      resolve: async (source, args) => {
        const { UserId, GameId } = args.purchaseInput;
        const result = await addPurchaseHandler(UserId, GameId);

        return result;
      },
    },
    // delete purchase from db. #ROLE only admins should be able to do this
    removePurchase: {
      type: purchaseResultType,
      args: {
        purchaseInput: { type: purchaseInputType },
      },
      resolve: async (source, args) => {
        const { UserId, GameId } = args.purchaseInput;
        const result = await removePurchaseHandler(UserId, GameId);

        return result;
      },
    },
  },
});

module.exports = purchaseMutation;
