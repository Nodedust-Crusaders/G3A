const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const tempQuery = new GraphQLObjectType();
const tempMut = new GraphQLObjectType();

const schema = new GraphQLSchema({
  query: tempQuery,
  mutation: tempMut,
});
