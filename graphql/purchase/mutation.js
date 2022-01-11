const { GraphQLObjectType } = require("graphql");
const { purchaseInputType, purchaseResultType } = require("./types");
const {
  addPurchaseHandler,
  removePurchaseHandler,
} = require("../../handlers/purchases");

const purchaseMutation = new GraphQLObjectType({
  name: "PurchaseMutation",
  fields: {
    addPurchase: {
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
