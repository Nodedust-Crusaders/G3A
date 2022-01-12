const { GraphQLSchema, GraphQLObjectType, GraphQLList } = require("graphql");
const { getAllUsers } = require("../handlers/users");
const { authQuery, authMutation } = require("./auth");
const { gameQuery, gameMutation } = require("./game");
const { platformQuery, platformMutation } = require("./platform");
const { publisherQuery, publisherMutation } = require("./publisher");
const { purchaseQuery, purchaseMutation } = require("./purchase");
const { reviewMutation, reviewQuery } = require("./review");
const { categoryMutation, categoryQuery } = require("./category");
const { userType } = require("./user/types");

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: async () => {
        return await getAllUsers();
      },
    },
    ...authQuery.toConfig().fields,
    ...gameQuery.toConfig().fields,
    ...purchaseQuery.toConfig().fields,
    ...reviewQuery.toConfig().fields,
    ...categoryQuery.toConfig().fields,
    ...platformQuery.toConfig().fields,
    ...publisherQuery.toConfig().fields
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...authMutation.toConfig().fields,
    ...gameMutation.toConfig().fields,
    ...purchaseMutation.toConfig().fields,
    ...reviewMutation.toConfig().fields,
    ...categoryMutation.toConfig().fields,
    ...platformMutation.toConfig().fields,
    ...publisherMutation.toConfig().fields
  },
});

// console.log(authMutation.getFields());

const schema = new GraphQLSchema({
  query,
  mutation,
});

module.exports = schema;
