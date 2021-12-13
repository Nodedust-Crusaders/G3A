const { GraphQLObjectType } = require("graphql");

const authQuery = new GraphQLObjectType({
  name: "AuthQuery",
  fields: {},
});

module.exports = authQuery;
