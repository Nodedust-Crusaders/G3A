const { GraphQLSchema, GraphQLObjectType, GraphQLList } = require("graphql");
const { getAllUsers } = require("../handlers/users");
const { authQuery, authMutation } = require("./auth");
const { gameQuery, gameMutation } = require("./game");
const purchaseQuery = require("./purchase/query");
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
    ...purchaseQuery.toConfig().fields
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...authMutation.toConfig().fields,
    ...gameMutation.toConfig().fields,
  },
});

// console.log(authMutation.getFields());

const schema = new GraphQLSchema({
  query,
  mutation,
});

module.exports = schema;